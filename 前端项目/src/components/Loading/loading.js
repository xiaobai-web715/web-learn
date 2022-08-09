import React, { useEffect, useRef} from 'react'
import './loading.scss'
const Css = require('./loading.scss')

const LoadingIndex = () => {
    useEffect(() => {
        //初始加载的时候增加一个遮罩
        useRef.current = document.createElement('div');
        useRef.current.textContent = '添加遮罩';
        // dom.style.cssText会一次性重写dom的行内样式值(你用了cssText之后原有的行内样式消失,然后变成你添加的这个)
        useRef.current.style.cssText = 'width:100vw;height:100vh;background-color:black;position:absolute;top:0;left:0;opacity:0.6;'
        console.log(useRef.current.style);
        document.body.appendChild(useRef.current);
        return () => {
            document.body.removeChild(useRef.current);
        }
    }, [])
    return(
        <>
            <div className={Css['loading-content']}>
                <div className={Css['content']}>
                    <div className={Css['image']}></div>
                </div>
            </div>
        </>
    )
}
export default LoadingIndex;