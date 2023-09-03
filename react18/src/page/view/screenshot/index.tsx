import React, {useState, useEffect} from 'react';
import Css from './screenShot.scss';

const Index = () => {
    const serviceTime = 30;
    const [timeList, setTimeList] = useState([]);
    useEffect(() => {
        const initialTime: Date = new Date(new Date().setDate(new Date().getDate() + 1));
        console.log('initialTime', initialTime.valueOf());
        const timeDataList: Array<TimeInfoI> = [];
        for(let i = 0; i <= serviceTime; i++) {
            const dateInfo = new Date(new Date().setDate(initialTime.getDate() - i));
            const day = dateInfo.getDay();
            const month = dateInfo.getMonth();
            const year = dateInfo.getFullYear();
            timeDataList.push({
                day,
                month,
                year
            });
        }
        console.log('我是构造之后的值', timeDataList.length, timeDataList);
    }, []);
    return (
        <div className={Css['screenShot']}>
            <div className={Css["dateData"]}>
                <div className={Css['dataBox']}></div>
            </div>
        </div>
    );
};

export default Index;