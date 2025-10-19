import { post, get } from "./index"

export const registerUser = <T, R>(params: T) => {
    return post<T, R>("/api/user/register", params)
}

export const loginUser = <T, R>(params: T) => {
    return post<T, R>("/api/user/login", params)
}