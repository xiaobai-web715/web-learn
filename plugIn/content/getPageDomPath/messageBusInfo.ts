type Grap = {
    [key in keyof MessageBusInfo] : MessageBusInfo[key]
}

class MessageBusInfo {
    dom: Element | null = null
    setItem<K extends keyof Grap>(key: K, value: this[K]): void {
        this[key] = value
    }
    getItem<K extends keyof Grap>(key: K): this[K] {
        return this[key]
    }
}

export default MessageBusInfo