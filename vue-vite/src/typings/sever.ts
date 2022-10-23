export interface IRoute {
    _id: number,
    pid: number,
    path: string,
    name: string,
    title: string,
    filePath?: string,
    children?: IRoute[],
}