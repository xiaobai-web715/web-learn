export interface IRoute {
    id: number,
    pid: number,
    path: string,
    name: string,
    title: string,
    link?: string,
    children?: IRoute[],
}