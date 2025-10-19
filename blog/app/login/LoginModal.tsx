'use client';
import React, { useReducer } from 'react';
import { Input, Button, App } from 'antd';
import { loginUser } from '@/request/userService';
import AntdThemeChange from '@/components/high-level/antd-theme';
interface IParams {
    username: string;
    email: string;
    password: string;
}
type IRequest = {
    userId: string;
} & IParams;
const LoginModal = () => {
    const { message } = App.useApp();
    const [state, dispatch] = useReducer(
        (state, action) => {
            return {
                ...state,
                ...action.data,
            };
        },
        {
            email: '',
            password: '',
        },
    );
    const login = () => {
        loginUser<Omit<IParams, 'username'>, IRequest>(state).then((res) => {
            if (res.code === 200) {
                console.log('我是获取到的用户信息', res);
            } else {
                message.error(res.message);
            }
        });
    };
    return (
        <div className="intro-gradient w-[27.5rem] p-[3rem] m-auto">
            <div className="formInfo">
                <div className="mb-[0.5rem]">邮箱</div>
                <Input
                    placeholder="您的邮箱地址"
                    value={state.email}
                    onChange={(e) => dispatch({ data: { email: e.target.value } })}
                    size="large"
                />
                <div className="mt-[1rem] mb-[0.5rem]">密码</div>
                <Input
                    placeholder="您的密码"
                    type="password"
                    value={state.password}
                    onChange={(e) => dispatch({ data: { password: e.target.value } })}
                    size="large"
                />
            </div>
            <Button
                type="primary"
                size="large"
                className="w-full mt-[2rem] relative left-[50%] translate-x-[-50%]"
                onClick={login}
            >
                登录
            </Button>
        </div>
    );
};

export default AntdThemeChange(LoginModal);
