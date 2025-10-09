import { post, get } from "./index"
const serverUrl = process.env.SERVER_REQUEST_BASE || '';
console.log("我的值是什么", serverUrl)
export const setDoc = <T, R>(data: T) => {
    return post<T, R>('/api/doc/setDoc', data)
}

export const getDocInfo = <R>() => {
    return get<R>(`${serverUrl}/doc/queryDoc`)
}

export const getDocContent = <R>(id: number) => {
    return get<R>(`${serverUrl}/doc/getDocContent?id=${id}`)
}