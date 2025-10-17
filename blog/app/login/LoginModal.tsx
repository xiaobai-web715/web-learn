'use client'
import React, { useReducer } from "react"
import { Input, Button } from "antd"
import AntdThemeChange from "@/components/high-level/antd-theme"
const LoginModal = () => {
    const [ state, dispatch ] = useReducer(
        (state, action) => {
            return {
                ...state,
                ...action.data
            }
        },
        {
            email: '',
            password: ''
        }
    );
    return (
        <React.Fragment>
            <div className="intro-gradient w-[27.5rem] p-[3rem]">
                <div className="formInfo">
                    <div className="mb-[0.5rem]">邮箱</div>
                    <Input placeholder="您的邮箱地址" value={state.email} onChange={(e) => dispatch({ data: {email: e.target.value} })} size="large"/>
                    <div className="mt-[1rem] mb-[0.5rem]">密码</div>
                    <Input placeholder="您的密码" type="password" value={state.password} onChange={(e) => dispatch({ data: {password: e.target.value} })} size="large"/>
                </div>
                <Button type="primary" size="large" className="w-full mt-[2rem] relative left-[50%] translate-x-[-50%]">登录</Button>
            </div>
        </React.Fragment>
    )
}

export default AntdThemeChange(LoginModal)

