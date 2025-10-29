import { Response } from "@/request/index";
import { useReducer } from "react";

const useRequest = <T, R>(callback: (params: T) => Promise<Response<R>>): [
    Response<R> & { loading: boolean }, 
    (params: T) => Promise<Response<R>>,
] => {
    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === 'request') {
            return {
                code: null,
                message: null,
                data: null,
                loading: true
            }
        } else {
            return {
                ...state,
                ...action.data,
                loading: false
            }
        }
    }, {
        code: null,
        message: null,
        data: null,
        loading: false
    })
    const request = (params: T) => {
        dispatch({ type: 'request' })
        return callback(params).then(res => {
            dispatch({
                type: 'finish',
                data: res
            })
            return res
        })
    }
    return [state, request]
}
export default useRequest;