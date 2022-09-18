import React, {useEffect, useRef} from 'react';
import Css from './index.scss';

const Index = () => {
    const user = ['1zhang1zhang1zhang1zhang1zhang1zhang1zhang1zhang1zhang1zhang1zhang1zhang', '2liu', '3li','4transform: translateXtransform: translateX transform: translateX translateX transform: translateX translateX transform: translateX translateX transform: translateX translateX transform: translateX translateX transform: translateX translateX transform: translateX translateX transform: translateX'];
    const translateRoot = useRef();
    let copyValue = user[0];
    user.push(copyValue);
    useEffect(() => {
        let len = user.length;
        let count = 0;
        // addEventListener('transitionend', () => {
        //     console.log('我是何时滚动完成的', count);
        //     if(count >= len - 1 ){
        //         count = 0;
        //         translateRoot.current.style.cssText = `transition: transform 0s;transform: translateX(${-count * 100}%);`
        //     }
        // })
        let timeId = setInterval(() => {
            console.log('我没有执行吗;', translateRoot.current);
            count++;
            if(count > len-1){ //这里在超过4的时候会立即变换
                count = 0;
                translateRoot.current.style.transform =`translateX(${-count * 100}%);`;
                translateRoot.current.style.transition = 'transform 0s' ;
                console.log('没执行吗');
            }
            translateRoot.current.style.transform = `translateX(${-count * 100}%)`;
            // translateRoot.current.style.transition = 'transform 2s' ; //这里下面的这行样式会覆盖上面的样式
        }, 2000);
        return () => {
            clearInterval(timeId);
        };
    }, []);
    return (
        <div className={Css['translate']}>
            <div ref={translateRoot} className={Css['translateProps']}>
                {
                    user.map((item, index) => {
                        return(
                            <div key={item+index} className={Css['name']}>{item}</div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Index;