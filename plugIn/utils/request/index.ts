import { AxiosRequestConfig, AxiosResponse } from "axios";
import request from "./request";

export const post = <T>(url: string, data: T, headers: AxiosRequestConfig<T>) => {
    request.post<any, AxiosResponse<any>, T>(url, data, headers)
}