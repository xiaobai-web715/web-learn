import handleBackgroundToMessage from "./handleBackgroundToMessage"
import registerResponseToIframeMessage from './registerResponseToIframeMessage'
import loadFileToDoc from './loadFileToDoc'
import addResEvent from "./addResEvent"
import MessageBusInfo from "./messageBusInfo"
import CorresPoand from "@/utils/correspond"

const messageBusInfo = new MessageBusInfo()
const correspond = new CorresPoand({source: 'content'})
addResEvent(messageBusInfo) // 注册document事件
registerResponseToIframeMessage(correspond) // 注册响应iframe事件
handleBackgroundToMessage<MessageBusInfo>(messageBusInfo) //注册监听的事件命令
loadFileToDoc(correspond) //加载文件