import React from 'react';
import LoginModal from './LoginModal';
import Link from 'next/link';
const LoginPage = () => {
    return (
        <div className="loginPage">
            <div className="loginWrapper absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="text-center text-[2rem] mb-[1.5rem]">登录</div>
                <LoginModal />
                <div className="text-center text-[0.8rem]">没有账号？去<Link href="/register"><span className="text-[#1688DC]">注册</span></Link></div>
            </div>
        </div>
    )
}

export default LoginPage;