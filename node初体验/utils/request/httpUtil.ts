import IFileBuffer from './filebuffer'
interface IHttpUtil {
    boundary: string
    contentLength: number
    constructor: () => void
    generateBoundary: () => string
    structureFileContent: (key: string, buffer: IFileBuffer) => string
    structureContent: (key: string, val: string) => string
}
class HttpUtil {
    boundary: string
    contentLength: number
    constructor () {
        this.boundary = this.generateBoundary()
        this.contentLength = 0
    }

    generateBoundary (): string {
        // return Math.random().toString(32)
        return Buffer.from(Math.random().toString(16)).toString('base64')
    }

    structureFileContent (key: string, buffer: IFileBuffer): Array<string | Buffer> {
        const fileFront: string = `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${buffer.filename}"\r\nContent-Type:${buffer.mimetype}\r\n\r\n`
        const fileEnd: string = '\r\n\r\n'
        this.contentLength += (Buffer.from(fileFront + fileEnd, 'utf8').length + buffer.getBuffer().length)
        // return `${fileFront}${buffer.getBuffer()}${fileEnd}`  => 这个方式写入buffer数据会被${}序列化成字符串
        return [fileFront, buffer.getBuffer(), fileEnd]
    }

    structureContent (key: string, val: string): string[] {
        const content = `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n\r\n`
        this.contentLength += Buffer.from(content, 'utf8').length
        return [content]
    }
}
/**
 * 原型链的方式好像会导致this被ts类型判断的时候判断为any
 */
// HttpUtil.prototype.generateBoundary = function (): string {
//     return Math.random().toString(32) // 这两种方式构建boundary不影响后端获取数据
//     // return Buffer.from(Math.random().toString(16)).toString('base64') // 这种方式好像会有一个=跟在最后面(shenyu网关会报错=对于multipart/form-data类型的令牌无效)
// }
// // --boundary 下面代表一组，每一组的键和value都以\r\n\r\n作为标志(如果不以\r\n\r\n作为分割标志后端api接收会有一个报错信息Header section has more than 10240 bytes (maybe it is not properly terminated)] with root cause)
// HttpUtil.prototype.structureFileContent = function (key: string, buffer: any): string {
//     return `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${buffer.filename}"\r\nContent-Type:image/jpg\r\n\r\n${buffer.getBuffer()}\r\n\r\n`
// }
// HttpUtil.prototype.structureContent = function (key: string, val: string): string {
//     const content = `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n\r\n`
//     this.contentLength += Buffer.from(content, 'utf8').length
//     return content
// }

module.exports = HttpUtil
export default IHttpUtil
