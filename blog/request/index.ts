import axios, { Axios, AxiosRequestConfig } from 'axios'

export interface Response<R> {
    code: number | null;
    message: string | null;
    data: R | null;
}

const request = axios.create({
    withCredentials: true,
})

request.interceptors.request.use(config => {
    return config;
})

request.interceptors.response.use(response => {
    return response;
})

export const post = <T, R>(url: string, data: T, config?: AxiosRequestConfig) => {
    return request.post<Response<R>>(url, data, config).then(res => res.data)
}

export const get = <R>(url: string, config?: AxiosRequestConfig) => {
    return request.get<Response<R>>(url, config).then(res => res.data)
}

