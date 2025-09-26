import { post, get } from "./index"
const serverUrl = process.env.SERVER_REQUEST_BASE || '';
export const setDoc = <T, R>(data: T) => {
    return post<T, R>('/api/doc/setDoc', data)
}

export const getDocInfo = <R>() => {
    return get<R>(`${serverUrl}/doc/queryDoc`)
}