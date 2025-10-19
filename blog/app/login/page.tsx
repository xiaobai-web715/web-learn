import React from 'react';
import { App } from 'antd';
import LoginModal from './LoginModal';
import Link from 'next/link';
const LoginPage = () => {
    return (
        <div className="loginPage pb-[2rem]">
            <div className="loginWrapper">
                <div className="text-center text-[2rem] mb-[1.5rem]">登录</div>
                <App>
                    <LoginModal />
                </App>
                <div className="text-center text-[0.8rem] mt-[0.8rem]">
                    没有账号？去
                    <Link href="/register">
                        <span className="text-[#1688DC]">注册</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
