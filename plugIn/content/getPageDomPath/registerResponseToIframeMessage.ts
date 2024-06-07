import CorresPoand from "@/utils/correspond"
import {getSelectTargetHandler} from '@/content/handler'
import { MessageInfo } from "../handler/type"
export enum RegisterIframeEventKey {
    GET_SELECT_TARGET = 'GET_SELECT_TARGET'
}

interface Handler {
    (message: MessageInfo<any>, messageResponse?: Function) : void
}

const RegisterIframeEventKeyHandler: Record<RegisterIframeEventKey, Handler> = {
    [RegisterIframeEventKey.GET_SELECT_TARGET]: getSelectTargetHandler
}
const registerResponseToIframeMessage = (correspond: CorresPoand) => {
    const entries = Object.entries(RegisterIframeEventKeyHandler)
    entries.forEach(([key, callback]) => {
        correspond.registerListenerList(key, callback)
    })
}

export default registerResponseToIframeMessage