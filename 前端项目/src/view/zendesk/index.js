import React, { useEffect, useRef} from 'react'
import PublishSubscribe from '../../components/publishSubscribe';
const Css = require('./index.scss')

const Index = () => {
    let iframe = useRef();
    window.zESettings = {
        webWidget: {
            position: { horizontal: 'right', vertical: 'bottom' },
            contactForm: {
                attachments: true,
                subject: false,
            },
            contactOptions: {
                enabled: true,
                contactButton: { '*': 'Get in touch' },
                contactFormLabel: { '*': 'Leave a message' }//给我们留言
            }
        }
    }
    const publishSubscribe = new PublishSubscribe()
    publishSubscribe.subscribe('zendask', () => {
        window.zE('webWidget', 'open')
        getZendesk() //执行函数获取到webWidget对应iframe标签
        console.log('我是订阅者,并且成功执行了');
    });
    const goPage = () => {
        //在点击返回上一页的时候去处理这个事件就不需要定时器了
        const button = iframe.current.contentDocument.querySelector('main button[data-garden-id="buttons.button"]')
        //querySelector与querySelectorAll可以通过多方式结合的形式进行dom选择,上述的方式是匹配父元素是main标签,自身是一个button标签且带有一个属性是data-garden-id='buttons.button'的第一个满足的标签.
        button && button.click();
        window.zE('webWidget', 'logout');
        window.zE('webWidget', 'close');
        window.history.back();
    };
    const getZendesk = () => {
        iframe.current = document.querySelector('#webWidget');
        if(!iframe.current){
            return setTimeout(getZendesk, 500);
            // return getZendesk(); //这样的话这里会报栈溢出错误(用上面的延时函数的形式就不会有)
        }else{
            console.log('iframe标签成功获取到');
        }
    }
    useEffect(() => {
        let intervalId = setInterval(() => {
            if(typeof window.zESettings !== 'undefined'){
                publishSubscribe.publish('zendask');
                clearInterval(intervalId);
            }else{
                console.log('你的zendask还没有成功挂载');
            }
        },0);
        return () => {
            window.zE('webWidget', 'logout');
        }
    }, []);
    return(
        <div className={Css['page']}>
            <button onClick={goPage}>返回上一页</button>
        </div>
    )
}

export default Index