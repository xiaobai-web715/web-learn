export type TableType = Record<string, any>;

export interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
    children?: DataItem[];
}