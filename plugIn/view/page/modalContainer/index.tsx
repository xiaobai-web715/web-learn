import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import "./index.scss"
import { AppStore } from "@/view/store"
import { RegisterIframeEventKey } from "@/content/getPageDomPath/registerResponseToIframeMessage"
const ModalContainer = () => {
    const messageBus = useSelector((state: AppStore) => state.messageBus.value)
    useEffect(() => {
        messageBus?.sendMessageCallback(RegisterIframeEventKey.GET_SELECT_TARGET, '呀哈哈', (data: any) => {
            console.log("我是接收的返回的响应值", data)
        })
    }, [messageBus])
    return (
        <div className="modalContainer">111</div>
    )
}
export default ModalContainer