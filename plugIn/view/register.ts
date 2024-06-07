import CorresPoand from "@/utils/correspond"
import { carryIdTpSenderHandler } from "@/utils/handler"
export enum ReturnToSender {
    CARRY_ID_TO_SENDER = "CARRY_ID_TO_SENDER"
}

export const ReturnToSenderHandler: Record<ReturnToSender, any> = {
    [ReturnToSender.CARRY_ID_TO_SENDER]: carryIdTpSenderHandler
}

const registerResponseToContentMessage = (correspond: CorresPoand) => {
    const entries = Object.entries(ReturnToSenderHandler)
    entries.forEach(([key, callback]) => {
        correspond.registerListenerList(key, callback.bind(null, correspond.callbackList))
    })
}

export default registerResponseToContentMessage