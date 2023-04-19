export interface IRoute {
    id: number,
    path: string,
    name: string,
    title: string,
    hidden: boolean,
    filePath: string,
    ancestor: number,
    descendant: number,
    children?: IRoute[],
    className?: string,
}