import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { init } from "./store/reducer/messageReducer";
// import TestButton from "./page/test/index"
import ModalContainer from '@/view/page/modalContainer'
import Correspond from "@/utils/correspond";
import { AppDispatch } from "./store";
import registerResponseToContentMessage from "./register";
const Test = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const correspond = new Correspond({source: 'iframe'})
        // 执行事件注册
        registerResponseToContentMessage(correspond)
        dispatch(init(correspond))
    }, [])
    return (
        <ModalContainer></ModalContainer>
    )
}

export default Test