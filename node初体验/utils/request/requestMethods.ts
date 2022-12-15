const http = require('http')
const logger = require('../logger/index')
const { credentials } = require('../../config/config')
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
const requestAdmin = async <U> (url: string, params: IParams, method: string = 'POST', option: U): Promise<any> => {
    const options = {
        host: credentials.biServer.host,
        port: credentials.biServer.port,
        path: url,
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (option) {
        Object.assign(options, option)
    }
    console.log('options', options)
    return await new Promise((resolve, reject) => {
        const buffer = []
        const req = http.request(options, (res) => {
            // options配置好请求的参数
            res.on('data', (chunk) => {
                console.log('```````读取的二进制数据流``````````')
                buffer.push(chunk)
            })
            res.on('end', () => {
                console.log('```````二进制数据流读取结束``````````')
                resolve({ data: Buffer.concat(buffer), headers: res.headers })
            })
        })
        req.setTimeout(5000 * 2)
        req.on('error', (err) => {
            console.log('err', err)
        })
        req.write(JSON.stringify(params || {})) // 这里不加上请求无法成功,目前不清楚原因
        req.end()
    }).then(({ data, headers }: resp) => {
        if (headers['content-type'] === 'application/json') {
            const { message } = params
            if (message) {
                console.log('message', path.join(__dirname, '../..', 'logs/test.log'))
                fs.writeFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message }) + '\n', 'utf-8', (res) => {
                    console.log('写入完成')
                })
                fs.writeFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message: message + '卷心菜' }) + '\n', 'utf-8', (res) => {
                    console.log('写入完成')
                })
                // fs.appendFile(path.join(__dirname, '../..', 'logs/test.log'), `当前工作进程：${process.pid}` + JSON.stringify({ message }) + '\n', 'utf-8', (res) => {
                //     console.log('写入完成')
                // })
                // fs.appendFile(path.join(__dirname, '../..', 'logs/test.log'), JSON.stringify({ message: '卷心菜' }) + '\n', 'utf-8', (res) => {
                //     console.log('写入完成')
                // })
                logger.info({ message })
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
export {}
module.exports = {
    requestAdmin
}
