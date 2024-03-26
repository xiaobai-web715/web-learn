import { Component } from 'vue';
import { TableType, DataItem } from './tableType';
import { defaultPagination } from './defaultConfig';
import { after } from 'node:test';
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

    setConfig(config: TableType, headerSettings: TableType) {
        this.config = this._mergeConfig(config);
        this.headerSettings = headerSettings;
        this._createRowSelectionHooks();
        this._createRowPaginationHooks();

        this.pageSize = this.config.pagination?.pageSize || 10;
    }

    getConfig() {
        return this.config;
    }

    /**
     * 根据key设置config下面的属性
    */
    setConfigByKey(key: string, value: any) {
        this.config[key] = value;
    }

    request(): Promise<void> {
        const params = this.beforeRequest();
        // 使用params请求数据 获取到data
        return this.requestPromise.then((data) => {
            this.config.datasource = this.afterRequest(data);
        });
    }
    beforeRequest() {
        return this.getParams();
    }
    afterRequest(data: any) {
        return data;
    }

    /**
     * 表格唯一标识
    */
    getTableRowKey() {
        return this.config.rowKey || 'key';
    }

    /**
     * 表格选中列唯一的标识，，本身可以在section中设置 key text onSelect
    */
    getTableSelectionRowKey() {
        return this.config.rowSelection?.selection?.key || this.config.rowKey || 'key';
    }
    /**
     * 默认关联rowselection的onChange 和 selectedRowKeys，不需要用户处理
    */
    _createRowSelectionHooks() {
        if (this.config.rowSelection) {
            const onChange = this.config.rowSelection.onChange;
            this.config.rowSelection.onChange = (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
                this.setSelectedRowKeys(selectedRowKeys, selectedRows);
                onChange && onChange(selectedRowKeys, selectedRows);
            }
        }
    }

    setSelectedRowKeys(keys: (string | number | undefined)[], selectedRows?: DataItem[]) {
        if (keys.includes(undefined)) {
            console.error('请设置table的key，或 rowSelection.selections.key')
            return;
        }
        this.config.rowSelection.selectedRowKeys = keys;
        this.selectedRows = selectedRows || [];
    }

    /**
     * 获取选中的row keys
    */
    getselectedRowKeys() {
        return this.config.rowSelection?.selectedRowKeys || [];
    }

    /**
     * 合并初始的配置， 不考虑深层配置
    */
    _mergeConfig(config: TableType) {
        return {
            ...config,
            pagination: { ...config.pagination, ...defaultPagination },
        }
    }
    _createRowPaginationHooks() {
        if (this.config.pagination) {
            const onChange = this.config.pagination.onChange;
            this.config.pagination.onChange = (page: number, pageSize: number) => {
                this.pageNum = page;
                this.pageSize = pageSize;
                onChange && onChange(page, pageSize);
                this.request();
            }
        }
    }

    setParams(params: Record<string, any>) {
        this.params = params;
    }

    getParams() {
        return this.params;
    }
    setRequestPromise(requestPromise: Promise<any>) {
        this.requestPromise = requestPromise;
    }

}
