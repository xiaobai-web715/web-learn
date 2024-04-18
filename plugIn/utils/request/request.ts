import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:8021',
    timeout: 30000
})

request.interceptors.request.use((config) => {
    console.log('请求信息', config)
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

export default request