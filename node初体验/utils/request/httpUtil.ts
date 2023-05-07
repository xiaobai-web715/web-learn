const FileBuffer = require('./filebuffer')
class HttpUtil {
    boundary: string
    generateBoundary: () => string
    structureFileContent: (a: string, b: any) => string
    structureContent: (a: string, b: string) => string
    constructor() {
        this.boundary = this.generateBoundary()
    }
}
HttpUtil.prototype.generateBoundary = function (): string {
    return Math.random().toString(32) // 这两种方式构建boundary不影响后端获取数据
    // return Buffer.from(Math.random().toString(16)).toString('base64') // 这种方式好像会有一个=跟在最后面(shenyu网关会报错=对于multipart/form-data类型的令牌无效)
}
// --boundary 下面代表一组，每一组的键和value都以\r\n\r\n作为标志(如果不以\r\n\r\n作为分割标志后端api接收会有一个报错信息Header section has more than 10240 bytes (maybe it is not properly terminated)] with root cause)
HttpUtil.prototype.structureFileContent = function (key: string, buffer: any): string {
    return `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${buffer.filename}"\r\n\r\n${buffer.getBuffer()}\r\n\r\n`
}
HttpUtil.prototype.structureContent = function (key: string, val: string): string {
    return `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"\r\n\r\n${val}\r\n\r\n`
}

module.exports = HttpUtil
export { }
