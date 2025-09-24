import { post } from "./index"

export const setDoc = <T, R>(data: T) => {
    return post<T, R>('/doc/setDoc', data)
}