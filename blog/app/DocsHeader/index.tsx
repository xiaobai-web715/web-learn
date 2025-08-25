'use client'
import './index.less'
import { setTheme } from "@/utils/setTheme"
import React, { useState, useEffect } from 'react'
import { FaRegMoon } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { AiFillSun } from 'react-icons/ai';
function DocsHeader() {
    const [currentIcon, setCurrentIcon] = useState<'light' | 'dark'>('light')
    useEffect(() => {
        setTheme(currentIcon)
    }, [currentIcon])
    const changeTheme = () => {
        setCurrentIcon(currentIcon === 'light' ? 'dark' : 'light')
    }
    return (
        <div className='DocsHeader pl-[0.5rem] pr-[0.5rem] md:pl-[1rem] md:pr-[1rem] md:h-[4rem] h-[3rem]'>
            <div className='header-left text-responsive cursor-pointer whitespace-nowrap mr-[1rem]'>首页</div>
            <div className="md:w-[40%] w-[45%] header-middle border-[1px] dark:border-[#fff] border-[#999] rounded-[1.6rem] h-[66.6%] flex shrink-1 items-center pl-[1rem] pr-[1rem]">
                <FiSearch className='shrink-0 grow-0 w-[1.2rem] h-[1.2rem] md:w-[1.8rem] md:h-[1.8rem]'></FiSearch>
                <input className='inline-block flex-1 min-w-0 outline-none shadow-none pl-[0.5rem] pr-[0.5rem] h-[80%] md:h-[100%]' type="text"></input>
                <div className='shrink-0 grow-0 text-responsive cursor-pointer'>搜索</div>
            </div>
            <div className='header-right flex items-center justify-between text-responsive ml-[0.5rem]'>
                <div className='pl-[0.8rem] pr-[0.8rem] pt-[0.5rem] pb-[0.5rem] whitespace-nowrap rounded-[0.5rem] cursor-pointer dark:bg-[#0ea5e9] text-[#fff] bg-[#0f172a]'>登录</div>
                <div className='pl-[0.8rem] pr-[0.8rem] pt-[0.5rem] pb-[0.5rem] whitespace-nowrap rounded-[0.5rem] ml-[0.5rem] cursor-pointer dark:bg-[#0ea5e9] text-[#fff] bg-[#0f172a]'>注册</div>
                <div className="theme-icon cursor-pointer ml-[0.5rem]" onClick={changeTheme}>
                    {
                        currentIcon === 'light' ? <AiFillSun className='w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]' /> : <FaRegMoon className='w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]'/>
                    }
                </div>
            </div>
        </div>
    )
}

export default DocsHeader