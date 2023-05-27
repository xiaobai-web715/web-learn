//axios封装拦截器
/**
 * 生成基础的axios对象并对请求和响应做处理
 * 前后端约定好接口返回的数据格式
 * {
 *     status: 200,
 *     data: {里面是包含的信息}
 * }
 */
import axios from "axios";
import { ElMessage } from 'element-plus';
const service = axios.create({
    baseURL: '/api', //请求接口的时候会自动拼上
    headers: {}, //可以定义请求的头部信息
    timeout: 10000, //请求超时时间
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(config => {
    // 这里面目前看来可以向请求头当中添加token,sig等后端需要的头部信息
    if ((config?.url || '').indexOf('127.0.0.1') > -1) {
        config.baseURL = ''
    }
    console.log('config', config);
    return config;
});
/**
 * 响应拦截器
 */
service.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data;
    } else if (response.status === 403) {
        // 可以提示当前账号没有相应的权限
    } else {
        // 这里就提示相应的返回信息
    }
}, () => {
    // 请求超时会执行的函数
    ElMessage.info('网络异常，请稍后再试！');
});

export default service;