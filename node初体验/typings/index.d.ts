// import { Server } from 'http'

// declare let server: Server | null // 声明区局的变量

declare module Express{ // 模块化
    interface Request {
        files?: any[][any]
    }
}

interface IFileBuffer {
    filename: string
    filepath: string
    buffer: Buffer
    mimetype: string
    getBuffer: () => Buffer
}

interface IParams {
    [key: string]: undefined | string | string[] | IParams | IParams[] | IFileBuffer
}

interface IFindTodo {
    taskId: number
    value: string
}

interface IHttpUtil {
    boundary: string
    contentLength: number
    constructor: () => void
    generateBoundary: () => string
    structureFileContent: (key: string, buffer: IFileBuffer) => Array<string | Buffer[]>
    structureContent: (key: string, val: any) => string[]
}

interface resp {
    data: number[]
    headers: object
}
// 目前使用泛型想从函数调用处来声明类型，但是会报非类型函数调用不能使用类型参数的警告（所以先使用这种方式来替代）
interface IOptions {
    path: string
    host: number
    port: number
    method: string
    headers: { [key: string]: any }
}
