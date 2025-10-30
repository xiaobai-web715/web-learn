export interface IDoc {
    id: number;
    title: string;
    createTime: string;
    updateTime: string;
    imageAddress: string;
}
export interface IData {
    pages: number;
    total: number;
    records: Array<IDoc>;
}
