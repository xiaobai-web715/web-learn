export interface IRoute {
    fPid: number,
    pid: number,
    path: string,
    name: string,
    title: string,
    hidden: boolean,
    filePath: string,
    children?: IRoute[],
    className?: string,
}