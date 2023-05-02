const fs = require('fs')
class FileBuffer {
    filename: string
    filepath: string
    buffer: number[]
    getBuffer: () => number[]
    constructor (filename: string, filepath: string) {
        this.filename = filename
        this.filepath = filepath
        this.buffer = null
    }
}
FileBuffer.prototype.getBuffer = function (): number[] {
    if (!this.buffer) {
        this.buffer = fs.readFileSync(this.filepath)
    }
    return this.buffer
}

module.exports = FileBuffer

export {}
