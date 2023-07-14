import fs = require('fs')
class FileBuffer {
    filename: string
    filepath: string
    buffer: Buffer | null
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

export = FileBuffer
