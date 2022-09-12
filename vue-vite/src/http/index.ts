import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

//拦截request
axios.interceptors.request.use((config:AxiosRequestConfig) => {
    return config;
});

axios.interceptors.response.use((res: AxiosResponse) => {
    if(res.data.err === 1) {
        return Promise.reject(res.data.err)
    }
    return Promise.resolve(res.data.data);
}, (err) => {
    return Promise.reject(err);
})

export default axios;