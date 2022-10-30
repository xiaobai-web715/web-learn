import { AxiosResponseHeaders} from 'axios';
import service from './interceptor';

const request = <T>(url: string, method: string, params?: T, headers?: AxiosResponseHeaders) => {
        let data = {};
        if (method === 'get') {
            data = {params};
        }
        if (method === 'post') {
            data = {data: params};
        }
        //这里还能使用判断来判断是不是mock请求
        return service({
            url,
            ...data,
            method,
            headers,
        });
};

export default request;