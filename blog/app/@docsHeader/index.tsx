import './index.less'
import { setTheme } from "@/utils/setTheme"
import React, { useState, useEffect } from 'react'
import { FaRegMoon } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { AiFillSun, AiTwotoneHome } from 'react-icons/ai';
function DocsHeader() {
    // const [currentIcon, setCurrentIcon] = useState<'light' | 'dark'>('light')
    // useEffect(() => {
    //     setTheme(currentIcon)
    // }, [currentIcon])
    // const changeTheme = () => {
    //     setCurrentIcon(currentIcon === 'light' ? 'dark' : 'light')
    // }
    // return (
    //     <div className='DocsHeader pl-[0.5rem] pr-[0.5rem] md:pl-[1rem] md:pr-[1rem] md:h-[4rem] h-[3rem]'>
    //         <AiTwotoneHome className="header-left cursor-pointer mr-[1rem] w-[1.5rem] md:w-[2rem] h-[1.5rem] md:h-[2rem]"></AiTwotoneHome>
    //         <div className="md:w-[40%] w-[45%] header-middle border-[2px] border-rose-500/10 rounded-[1.6rem] h-[66.6%] flex shrink-1 items-center pl-[1rem]">
    //             <FiSearch className='shrink-0 grow-0 w-[1.2rem] h-[1.2rem] md:w-[1.8rem] md:h-[1.8rem]'></FiSearch>
    //             <input className='inline-block flex-1 min-w-0 outline-none shadow-none pl-[0.5rem] pr-[0.5rem] h-[80%] md:h-[100%]' type="text"></input>
    //             <div className='shrink-0 grow-0 text-responsive cursor-pointer h-[100%] pl-[1rem] pr-[1rem] rounded-[1.6rem] flex items-center justify-center background-line-gradient'>搜索</div>
    //         </div>
    //         <div className='header-right flex items-center justify-between text-responsive ml-[0.5rem]'>
    //             <div className='pl-[0.4rem] md:pl-[0.8rem] pr-[0.4rem] md:pr-[0.8rem] pt-[0.4rem] md:pt-[0.5rem] pb-[0.4rem] md:pb-[0.5rem] whitespace-nowrap rounded-[0.3rem] md:rounded-[0.5rem] cursor-pointer background-line-gradient'>登录</div>
    //             <div className='pl-[0.4rem] md:pl-[0.8rem] pr-[0.4rem] md:pr-[0.8rem] pt-[0.4rem] md:pt-[0.5rem] pb-[0.4rem] md:pb-[0.5rem] whitespace-nowrap rounded-[0.3rem] md:rounded-[0.5rem] ml-[0.5rem] cursor-pointer background-line-gradient'>注册</div>
    //             <div className="theme-icon cursor-pointer ml-[0.5rem]" onClick={changeTheme}>
    //                 {
    //                     currentIcon === 'light' ? <AiFillSun className='w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]' /> : <FaRegMoon className='w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]'/>
    //                 }
    //             </div>
    //         </div>
    //     </div>
    // )

    return '123'
}

export default DocsHeader