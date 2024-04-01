import axios from 'axios';
import {assemURL} from "../util/service"
export const getTableData = (params?:Record<string, any>) => {
    const baseUrl = "/api/lowMock/getInfo/table";
    const url = assemURL(baseUrl, params)
    return axios.get(url)
}