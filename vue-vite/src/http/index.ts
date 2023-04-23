import { AxiosResponseHeaders} from 'axios';
import service from './interceptor';
import proxyEvent from './proxyEvent';
import { AxiosPromise } from "axios";
export interface requestI<T> {
    url: string,
    method: string,
    params?: T, //对象有哪些属性有时候并不确定, 可以使用泛型
    headers?: AxiosResponseHeaders // ?表示当前是非必传
}
const request = <T>(config: requestI<T>): Promise<any> => {
    const {url, method, params, headers}: {url: string, method: string, params?: any, headers?: AxiosResponseHeaders} = config;
    let data = {};
    if (method === 'get') {
        data = {params};
    }
    if (method === 'post') {
        data = {data: params};
    }
    const taskInfo = {url, method, params, headers}; // 根据请求的信息判断请求是不是同一个
    const task = function (): AxiosPromise<any> {
        return service( {url, ...data, method, headers});
    };
    //这里还能使用判断来判断是不是mock请求
    return proxyEvent.proxy(
        task, 
        taskInfo
    );
};

export default request;