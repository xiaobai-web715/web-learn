import {Table} from "../test/index"
import Axios from "axios"

export default class TestTable extends Table {
    constructor() {
        super()
    }
    _requestPromise() { // @TODO
        return Axios.get("/api/test", {
            method: 'get',
            params: this.getParams()
        })
    }
    // 重写request的方法
    beforeRequest() {
        setTimeout(() => {
            this.config.dataSource.push(
                {
                    gender: "呀哈哈",
                    email: "liuxinghua715@163.com"
                }
            )
        }, 6000)
    }
    afterRequest(data: any) {
        return data;
    }
}