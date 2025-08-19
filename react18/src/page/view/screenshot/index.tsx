import React, {useState, useEffect, useRef} from 'react';
import Css from './screenShot.scss';

const Index = () => {
    const serviceTime = 7;
    const day = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];
    const scrollDom = useRef<Element>();
    const [timeList, setTimeList] = useState<Array<any>>([]);
    const [frontIndex] = useState(0);
    useEffect(() => {
        const timeDataList: Array<TimeInfoI> = [];
        for(let i = serviceTime; i >= 0; i--) {
            const dateInfo = new Date(new Date().setDate(new Date().getDate() - i));
            const day = dateInfo.getDay();
            const date = dateInfo.getDate();
            const month = dateInfo.getMonth() + 1;
            const year = dateInfo.getFullYear();
            timeDataList.push({
                day,
                date,
                month,
                year,
                timeStamp: dateInfo.valueOf()
            });
        }
        console.log('我是构造之后的值', timeDataList.length, timeDataList);
        setTimeList(timeDataList);
    }, []);
    const slidingTrigger = (e) => {
        console.log('滑动触发', [e], [scrollDom.current]);
        if (scrollDom.current?.scrollLeft == 0) {
            console.log('此时我已经滚动到最右侧了');
            createFrontTime();
        }
    };
    const createFrontTime = () => {
        const frontEle = timeList[frontIndex];
        console.log('frontEle', frontEle);
        const copyTimeList = [...timeList];
        const data = new Date(new Date().setDate((new Date(frontEle.timeStamp).getDate() - 1)));
        console.log('date', data);
        const day = data.getDay();
        const date = data.getDate();
        const month = data.getMonth() + 1;
        const year = data.getFullYear();
        copyTimeList.unshift({
            day,
            date,
            month,
            year,
            timeStamp: data.valueOf()
        });
        copyTimeList.pop();
        console.log('copyTimeList', copyTimeList);
        setTimeList([...copyTimeList]);
    };
    return (
        <div className={Css['screenShot']}>
            <div className={Css["dateData"]}
                onScroll={slidingTrigger}
                ref={dom => {
                    if(dom) {
                        dom.scrollLeft = 30;
                        scrollDom.current = dom;
                        console.log('dom', [dom]);
                    }
                }}
            >
                <div className={Css['dataBox']}
                    // style={{transform: `translate(${-30}px)`}}
                >
                    {
                        timeList.map(info => {
                            return (
                                <div className={Css['data']} key={info.month + '-' + info.date}>
                                    <div className={Css['dayOfWeek']}>{day[info.day]}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Index;