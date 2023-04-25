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

export interface ISection {
    id: number,
    sectionName: string,
    ancestor: number,
    distance: number,
    descendant: number,
    children?: ISection[],
}