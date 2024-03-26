import Axios from "axios";
import SuperTable from "../super-table/SuperTable";

export default class TestTable extends SuperTable {

    constructor() {
        super();
    }

    _requestPromise() { // @TODO
        return Axios.get("/api/test", {
            method: 'get',
            params: this.getParams()
        })
    }
    // 重写request的方法
    beforeRequest() {
        return this.getParams();
    }
    afterRequest(data: any) {
        return data;
    }

}