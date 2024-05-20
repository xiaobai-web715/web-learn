import IHttpUtil from './httpUtil'
import http = require('http')
// import logger = require('../logger/index')
import HttpUtil = require('./httpUtil')
import FileBuffer = require('./filebuffer')
import tool = require('../tool')
import path = require('path')
import fs = require('fs')
import credentials = require('../../config/config')
const { objToUrl } = tool
let httpUtil: IHttpUtil | null = null
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
        let writeContent: Array<Array<string | Buffer>> = []
        Object.entries(params).forEach(([key, value]) => {
            if (value instanceof FileBuffer) {
                // 既然已经通过instanceof判断进入到改语句内部,那么就可以断言其为IFileBuffer了
                writeContent = writeContent.concat((httpUtil as IHttpUtil).structureFileContent(key, value as IFileBuffer))
            } else {
                writeContent = writeContent.concat((httpUtil as IHttpUtil).structureContent(key, value as string))
            }
        })
        const contentLength: number = (httpUtil as IHttpUtil).contentLength + Buffer.byteLength(`--${(httpUtil as IHttpUtil).boundary}--`)
        req.setHeader('Content-Length', contentLength)
        writeContent.forEach(item => {
            req.write(item)
        })
        req.write(`--${(httpUtil as IHttpUtil).boundary}--`)
    },
    POSTUrlencoded: (req, params) => {
        const parameter: string[] = []
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
const requestAdmin = async (url: string, params: IParams, method: string = 'POST', req?): Promise<any> => {
    const options: IOptions = {
        host: credentials.biAdmin.host,
        port: credentials.biAdmin.soulPort,
        // port: 8888, // Fiddler抓包的代理端口
        path: url,
        method,
        headers: {}
    }
    if (req) {
        options.headers['X-Access-Token'] = req.headers['x-access-token']
    }
    const finalOptions = structure[method](options, params) // 根据不同的method构造不同的headers
    return await new Promise((resolve, reject) => {
        const buffer: Uint8Array[] = []
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
            // console.log('data.toString()', data.toString())
            return { headers, data }
        }
    }).catch(err => {
        console.log('err', err)
    })
}
export = {
    requestAdmin
}
