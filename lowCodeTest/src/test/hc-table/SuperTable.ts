import { TableType } from './tableType';
export default abstract class SuperTable {
    config: TableType = {}
    
    headerSettings: TableType = {}

    selectedRows: any[] = []

    pageSize: number = 10

    pageNum: number = 1

    params: any = {}

    requestPromise: Promise<any> = Promise.resolve() // 放表格请求数据的promise对象

    constructor() {
    }

    setConfig(config, headerSettings) {
        this.config = config,
        this.headerSettings = headerSettings
    }
}