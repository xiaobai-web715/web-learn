import IHttpUtil from './httpUtil'
import IFileBuffer from './filebuffer'
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
    [key: string]: string | number | IFileBuffer
}
interface IOptions {
    path: string
    host: number
    port: number
    method: string
    headers: { [key: string]: any }
}
let httpUtil: IHttpUtil = null
const structure = {
    POST: (options) => {
        options.headers['Content-Type'] = 'application/json'
        return options
    },
    POSTFormData: (options) => {
        httpUtil = new HttpUtil()
        options.headers['Content-Type'] = `multipart/form-data; boundary=${httpUtil.boundary}`
        options.method = 'POST'
        return options
    },
    POSTUrlencoded: (options) => {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        options.method = 'POST'
        return options
    },
    GET: (options: IOptions, params) => {
        options.path += String(objToUrl(params))
        return options
    }
}
const requestBody = {
    POST: (req, params) => {
        const sendInfo = JSON.stringify(params)
        req.write(sendInfo)
    },
    POSTFormData: (req, params: IParams) => {
        let writeContent: Array<string | Buffer[]> = []
        Object.entries(params).forEach(([key, value]) => {
            if (value instanceof FileBuffer) {
                // 既然已经通过instanceof判断进入到改语句内部,那么就可以断言其为IFileBuffer了
                writeContent = writeContent.concat(httpUtil.structureFileContent(key, value as IFileBuffer))
            } else {
                writeContent = writeContent.concat(httpUtil.structureContent(key, value))
            }
        })
        const contentLength: number = httpUtil.contentLength + Buffer.byteLength(`--${httpUtil.boundary}--`)
        req.setHeader('Content-Length', contentLength)
        writeContent.forEach(item => {
            req.write(item)
        })
        req.write(`--${httpUtil.boundary}--`)
    },
    POSTUrlencoded: (req, params) => {
        const parameter = []
        /**
         * 如果除了拼接部分外有&符号需要进行编码, 如果有空格将空格转换成+号,如果有特殊符号,要将特殊符号转换成ASCII HEX值
         */
        Object.entries(params).forEach(([key, value]) => {
            parameter.push(`${key}=${value}`)
        })
        req.write(parameter.join('&'))
    },
    GET: (req, params) => {

    }
}
const requestAdmin = async <U>(url: string, params: IParams, method: string = 'POST', optionBase: U): Promise<any> => {
    const options: IOptions = {
        host: credentials.biAdmin.host,
        port: credentials.biAdmin.port,
        // port: 8888, // Fiddler抓包的代理端口
        path: url,
        method,
        headers: {}
    }
    if (optionBase) {
        Object.assign(options, optionBase)
    }
    const finalOptions = structure[method](options, params) // 根据不同的method构造不同的headers
    return await new Promise((resolve, reject) => {
        const buffer = []
        const req = http.request(finalOptions, (res) => {
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
        requestBody[method](req, params)
        req.end()
    }).then(({ data, headers }: resp) => {
        // console.log('headers', headers['content-type'])
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
                // logger.info({ message: message + `process: ${process.pid}` })
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
        } else {
            return { headers, data }
        }
    }).catch(err => {
        console.log('err', err)
    })
}
export { }
module.exports = {
    requestAdmin
}
