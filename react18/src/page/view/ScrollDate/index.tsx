import React, {useState} from 'react';
import ChooseModel from './chooseModel';
import {repeats} from './emuns';

const ScrollDate = () => {
    const [dateChooseStatus, setDateChooseStatus] = useState(false);
    const [dateChooseInfos, setDateChooseInfos] = useState<{key: string, columns: objectI[]}>({key: '', columns: []});
    const displayDateChoose = () => {
        setDateChooseStatus(true);
        // 当前使用默认值
        setDateChooseInfos({
            key: 'repeat',
            columns: [
                {
                    key: 'repeat',
                    values: repeats
                }
            ]
        });
    };
    const sureCallback = (key: string, val: objectI | objectI[]): void => {
        console.log('我是key与value', key, val);
    };
    const cancelCallback = () => {
        
    };
    return (
        <div>
            <button onClick={displayDateChoose}>{'点击选择日期'}</button>
            {
                dateChooseStatus ? (
                    <ChooseModel {...dateChooseInfos} sureCallback={sureCallback} cancelCallback={cancelCallback}></ChooseModel>
                ) : ''
            }
        </div>
    );
};

export default ScrollDate;