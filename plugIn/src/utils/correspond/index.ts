import { nanoid } from "nanoid"
// 负责iframe与主应用之间的通信
interface CorresPoandProps {
    source: string,
}
interface Listener {
    [key: string]: Function
}
interface CallBack {
    [key: string]: Function
}
enum ReturnToSender {
    CARRY_ID_TO_SENDER = "CARRY_ID_TO_SENDER"
}
class CorresPoand {
    source: string = ''
    iframePanel: HTMLIFrameElement | null = null
    listener: Listener = {}
    callbackList: CallBack = {}
    constructor(props: CorresPoandProps) {
        this.source = props.source
        this.registerMessage() // 注册监听事件
    }

    sendMessage(type: string, data?: any, id?: string) {
        let sender: Window | null = null;
        if (this.source == 'iframe') {
            // iframe层 发送消息到content层
            sender = window.parent
        } else {
            // content层发送消息到iframe层
            sender = (this.iframePanel as HTMLIFrameElement).contentWindow
        }
        try {
            const jsonMessage: string = JSON.stringify(
                {
                    type, 
                    data,
                    id
                }
            );
            (sender as Window).postMessage(jsonMessage, "*")
        } catch (err) {
            console.log("发送的消息序列化失败", err)
        }
    }

    sendMessageCallback<T, U extends Function>(type: string, data: T, callback: U) {
        const id = nanoid()
        this.callbackList[id] = callback
        this.sendMessage(type, data, id)
    }

    registerListenerList(type: string, callback: Function) {
        this.listener[type] = callback
    }

    
    addResponseReturnMessage(type: string, id?: string, data?: any) {
        if (id) {
            this.sendMessage(type, {id, data}) // 将id与data包在一起，这样再接收消息的一方就可以知道这是接收消息的一方带着发起方需要的消息返回过来了
        }
    }

    registerMessage() {
        window.addEventListener('message', (event: MessageEvent) => {
            const information = event.data
            try {
                const message = JSON.parse(information)
                const {type, data, id} = message
                const callback = this.listener[type]
                // 接收消息的地方判断message中是否有id，如果有则需要触发后续的发送消息的事件
                callback && callback(data, this.addResponseReturnMessage.bind(this, ReturnToSender.CARRY_ID_TO_SENDER, id))
            } catch (err) {
                console.log('接收的消息反序列化失败', err)
            }
        })
    }
}

export default CorresPoand