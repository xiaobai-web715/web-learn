const FileBuffer = require('./filebuffer')
class HttpUtil {
    boundary: string
    generateBoundary: () => string
    structureFileContent: (string, any) => string
    constructor () {
        this.boundary = this.generateBoundary()
    }
}
HttpUtil.prototype.generateBoundary = function (): string {
    return '---------------------------' + Math.random().toString(32)
}
HttpUtil.prototype.structureFileContent = function (key: string, buffer: any): string {
    const content = `--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"; filename="${encodeURIComponent(buffer.filename)}"`
    console.log('content', content)
    return content
}

module.exports = HttpUtil
export {}
