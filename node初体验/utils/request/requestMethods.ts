const http = require('http')
const logger = require('../logger/index')
const { credentials } = require('../../config/config')
interface resp {
    data: number[]
    headers: object
}
const requestAdmin = async <T, U> (url: string, params: T, method: string = 'POST', option: U): Promise<any> => {
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
            logger.info('hello', { message: 'world' })
            logger.log('error', 'hello', { message: 'world' })
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
