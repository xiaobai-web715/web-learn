export interface IDoc {
    id: number;
    title: string;
}
export interface IData {
    pages: number;
    total: number;
    records: Array<IDoc>;
}
