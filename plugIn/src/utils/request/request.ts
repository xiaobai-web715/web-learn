import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8021',
    timeout: 30000
})

const dataFormatProcess = <T, D>(data: T | undefined, config: AxiosRequestConfig<D> | undefined = {}) => {
    const contentType = config.headers?.['content-type']
}

request.interceptors.request.use((config) => {
    return config
}, (error) => {
    console.log("请求出错拦截", error)
    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    // 可以对数据进行格式化处理
    return response
}, (error) => {
    console.log("响应出现错误", error)
    return Promise.reject(error)
})

// request.post = <T, D, R>(url: string, data?: T, config?: AxiosRequestConfig<D> | undefined): AxiosResponse<R, any> => {
//     const headerConfig = config || {}
//     const requestBody = dataFormatProcess<T, D>(data, config)
// }

export default request