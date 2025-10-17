'use client'
import React, { useReducer } from "react"
import { Input, Button, message } from "antd"
import { registerUser } from "@/request/userService"
import AntdThemeChange from "@/components/high-level/antd-theme"
interface IParams {
    username: string,
    email: string,
    password: string,
}
type IRequest = {
    userId: string
} & IParams
const LoginModal = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [ state, dispatch ] = useReducer(
        (state, action) => {
            return {
                ...state,
                ...action.data
            }
        },
        {
            username: '', // 账户名称
            email: '', // 邮箱
            password: '', // 密码
            confirmPassword: '' // 确认密码
        }
    );
    const register = () => {
        if (state.password !== state.confirmPassword) {
            return messageApi.error('两次密码不一致');
        } else if (!state.username || !state.email || !state.password || !state.confirmPassword) {
            return messageApi.error('请填写完整信息');
        } else {
            registerUser<IParams, IRequest>(state).then(res => {
                console.log("我是获取的接口信息", res)
            })
        }
    }
    return (
        <div className="intro-gradient w-[27.5rem] p-[3rem] m-auto">
            {contextHolder}
            <div className="formInfo">
                <div className="mb-[0.5rem]">邮箱</div>
                <Input placeholder="您的账户名称" value={state.username} onChange={(e) => dispatch({ data: {username: e.target.value} })} size="large"/>
                <div className="mt-[1rem] mb-[0.5rem]">邮箱</div>
                <Input placeholder="您的邮箱地址" value={state.email} onChange={(e) => dispatch({ data: {email: e.target.value} })} size="large"/>
                <div className="mt-[1rem] mb-[0.5rem]">密码</div>
                <Input placeholder="您的密码" type="password" value={state.password} onChange={(e) => dispatch({ data: {password: e.target.value} })} size="large"/>
                <div className="mt-[1rem] mb-[0.5rem]">确认密码</div>
                <Input placeholder="确认密码" type="password" value={state.confirmPassword} onChange={(e) => dispatch({ data: {confirmPassword: e.target.value} })} size="large"/>
            </div>
            <Button type="primary" size="large" className="w-full mt-[2rem] relative left-[50%] translate-x-[-50%]" onClick={register}>注册</Button>
        </div>
    )
}

export default AntdThemeChange(LoginModal)