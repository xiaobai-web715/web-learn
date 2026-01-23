export const carryIdTpSenderHandler = (callbackMap: Record<string, Function>, message: any) => {
    const {id, data} = message
    const callback = (callbackMap || {})[id]
    if (callback) {
        delete callbackMap[id]
        callback(data)
    }
}