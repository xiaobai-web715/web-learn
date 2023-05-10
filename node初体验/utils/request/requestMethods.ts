const http = require('http')
const logger = require('../logger/index')
const { credentials } = require('../../config/config')
const HttpUtil = require('./httpUtil.ts')
const FileBuffer = require('./filebuffer')
const { objToUrl } = require('../tool.ts')
const path = require('path')
const fs = require('fs')
interface resp {
    data: number[]
    headers: object
}
// 目前使用泛型想从函数调用处来声明类型，但是会报非类型函数调用不能使用类型参数的警告（所以先使用这种方式来替代）
interface IParams {
    message: string
}
const requestAdmin = async <U>(url: string, params: IParams, method: string = 'POST', optionBase: U): Promise<any> => {
    const options = {
        host: credentials.biAdmin.host,
        port: credentials.biAdmin.port,
        // port: 8888, Fiddler抓包的代理端口
        path: url,
        method,
        headers: {}
    }
    if (optionBase) {
        Object.assign(options, optionBase)
    }
    if (!options.headers['Content-Type']) {
        if (method === 'POST') {
            Object.assign(options, { headers: { 'Content-Type': 'application/json' } })
        } else if (method === 'GET') {
            url = url + String(objToUrl(params))
            options.path = url
        }
    }
    return await new Promise((resolve, reject) => {
        const buffer = []
        let httpUtil = null
        if (options.headers['Content-Type'] === 'multipart/form-data') {
            httpUtil = new HttpUtil()
            // options.headers['Content-Length'] = 53324
            options.headers['Content-Type'] = `multipart/form-data; boundary=${httpUtil.boundary}`
        }
        const req = http.request(options, (res) => {
            // options配置好请求的参数
            res.on('data', (chunk) => {
                buffer.push(chunk)
            })
            res.on('end', () => {
                resolve({ data: Buffer.concat(buffer), headers: res.headers })
            })
        })
        req.setTimeout(5000 * 2)
        req.on('error', (err) => {
            console.log('err', err)
        })
        let sendInfo = ''
        if (options.headers['Content-Type'] === 'application/json') {
            sendInfo = JSON.stringify(params)
            req.write(sendInfo)
        } else if (options.headers['Content-Type'] && options.headers['Content-Type'].indexOf('multipart/form-data') > -1) {
            Object.entries(params).forEach(([key, value]) => {
                if (value instanceof FileBuffer) {
                    req.write(httpUtil.structureFileContent(key, value))
                } else {
                    req.write(httpUtil.structureContent(key, value))
                }
            })
            req.write(`\r\n--${httpUtil.boundary}--`)
        }
        req.end()

        // console.log('options.headers', options)
        // req.write(JSON.stringify(params || {})) // 目前都是以JSON的格式进行传递的
    }).then(({ data, headers }: resp) => {
        if (headers['content-type'] === 'application/json') {
            const { message } = params
            if (message) {
                // console.log('message', path.join(__dirname, '../..', 'logs/test.log'))
                // fs.writeFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message }) + `process: ${process.pid}` + '\n', 'utf-8', (res) => {
                //     console.log('写入完成')
                // })
                // fs.writeFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message: message + '卷心菜' }) + '\n', 'utf-8', (res) => {
                //     console.log('写入完成')
                // })
                fs.appendFile(path.join(__dirname, '../..', 'logs/test.log'), `当前工作进程：${process.pid}` + JSON.stringify({ message }) + '\n', 'utf-8', (res) => {
                    console.log('写入完成')
                })
                // fs.appendFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message: '卷心菜' }) + '\n', 'utf-8', (res) => {
                //     console.log('写入完成')
                // })
                logger.info({ message: message + `process: ${process.pid}` })
                // logger.log('error', 'hello', { message: 'world' })
            }
            return JSON.parse(data.toString())
        } else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
            const keyValue = data.toString()
            const arrayValue = keyValue.split('&')
            const result = {}
            arrayValue.forEach(item => {
                const keyValue = item.split('=')
                result[keyValue[0]] = keyValue[1]
            })
            return result
        }
    }).catch(err => {
        console.log('err', err)
    })
}
export { }
module.exports = {
    requestAdmin
}
