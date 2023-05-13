const fs = require('fs')
interface IFileBuffer {
    filename: string
    filepath: string
    buffer: Buffer
    mimetype: string
    getBuffer: () => Buffer
}
class FileBuffer {
    filename: string
    filepath: string
    buffer: Buffer
    mimetype: string
    constructor (file) {
        this.filename = file.filename
        this.filepath = file.path
        this.mimetype = file.mimetype
        this.buffer = null
    }

    getBuffer (): Buffer {
        if (!this.buffer) {
            this.buffer = fs.readFileSync(this.filepath)
        }
        return this.buffer
    }
}
// FileBuffer.prototype.getBuffer = function (): number[] {
//     if (!this.buffer) {
//         this.buffer = fs.readFileSync(this.filepath)
//     }
//     return this.buffer
// }

module.exports = FileBuffer

export default IFileBuffer
