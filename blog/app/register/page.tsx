import React from 'react';
import RegisterModal from './RegisterModal';
import Link from 'next/link';
const LoginPage = () => {
    return (
        <div className="loginPage pb-[2rem]">
            <div className="loginWrapper">
                <div className="text-center text-[2rem] mb-[1.5rem]">注册</div>
                <RegisterModal />
                <div className="text-center text-[0.8rem] mt-[0.8rem]">已有账号！去<Link href="/login"><span className="text-[#1688DC]">登录</span></Link></div>
            </div>
        </div>
    )
}

export default LoginPage;