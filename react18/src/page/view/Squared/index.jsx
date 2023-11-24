import React, {useState, useRef} from 'react';
import Css from './index.scss';

const Index = () => {
    let timer = 1000; //1s钟结束
    const [start, setStart] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0); // 启动的位置
    const awardList = [1,2,3,4,5,6,7,8];
    const haveBtnList = [...awardList];
    haveBtnList.splice(awardList.length / 2, 0, '#');
    console.log('haveBtnList', haveBtnList);
    const runTraje = [0,1,2,4,7,6,5,3];
    const targetValList = [3,4,6];
    const noldVal = useRef(0); // 抽奖次数
    const startRaffel = (time, fn, immediate) => {
        // timer 定时器
        let timer;
        console.log('time', timer);
        const later = (params) => {
            if (!immediate) {
                fn.apply(null, params);
            }
            console.log('我可以重新执行了');
            clearTimeout(timer);
            timer = null;
        };
        return (...params) => {
            if (immediate && !timer) {
                fn.apply(null, params);
            }
            console.log('timer', timer);
            if (!timer) {
                timer = setTimeout(() => {
                    later(params);
                }, time);
            }
        };
    };
    const timerLottery = (count, time, runTotal) => {
        ++runTotal;
        if (count > 0) {
            setTimeout(() => {
                if (count <= 8) {{
                    time+= 100;
                }}
                const index = runTraje[runTotal % 8];
                const value = awardList[index];
                const endResultIndex = haveBtnList.indexOf(value);
                console.log('count_time', runTotal, endResultIndex);
                setCurrentIndex(endResultIndex);
                timerLottery(--count, time, runTotal);
            }, time);
        }

    };
    const startLottery = () => {
        if (noldVal.current >= targetValList.length) {
            return; 
        } else {
            console.log('开始抽奖');
            setStart(true);
            const targetVal = targetValList[noldVal.current];
            const count = 2 * runTraje.length + awardList.indexOf(targetVal);
            console.log('我是需要行走的步数', count);
            timerLottery(count, 100, currentIndex);
        }
    };
    return (
        <div className={Css["banner"]}>
            <div className={Css["content"]} draggable="true">
                {
                    haveBtnList.map((item, index) => {
                        if (item === '#') {
                            return (
                                <div className={Css["btn"]} onClick={startRaffel(timer,startLottery, true)} key={index}></div>
                            );
                        } else {
                            return (
                                <div className={Css["box"]} key={index}>
                                    {
                                        start && index != (currentIndex % haveBtnList.length) ? (
                                            <div className={Css['mask']}></div>
                                        ) : ''
                                    }
                                </div>
                            );
                        }
                    })
                }
            </div>
        </div>
    );
};

export default Index;