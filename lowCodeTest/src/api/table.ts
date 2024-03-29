import axios from 'axios';
import {assemURL} from "../util/service"
export const getTableData = (params?:Record<string, any>) => {
    const baseUrl = "/api/lowMock/getInfo/table";
    const url = assemURL(baseUrl, params)
    console.log("我是请求最终的url", url)
    return axios.get(url)
}