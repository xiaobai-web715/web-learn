import React, {useState} from 'react';
import axios from 'axios';
const  Css = require('./concurrency.scss');

let startTime = null;
let endTime = null;
const Concurrency = () => {
    const [num, setNum] = useState(10); //任务数量默认是10
    const [concurrency, setConcurrency] = useState(1); //默认请求串行
    const [time, setTime] = useState(0);
    const goAxios = (index) => {
        const data = {
            message: `任务数量：${num}，并发数量：${concurrency}，当前执行任务：${index + 1}`
        };
        return  axios.post('/api/admin/hospInfo/findAll', data);
    };
    const getTaskList = () => {
        return new Array(Number(num)).fill(0).map(item => {
            return goAxios; 
        });
    };
    const goRequest = () => {
        startTime = new Date().valueOf();
        const taskList = getTaskList();
        console.log('taskList', taskList);
        //接收一个索引来加载对应索引位置的请求任务
        const taskDetails = (index) => {
            return new Promise((resolve, reject) => {
                const task = taskList[index];
                if (task) {
                    task(index).then( async res => {
                        await taskDetails(index + Number(concurrency));
                        resolve('完成');
                    });
                } else {
                    resolve();
                }
            });
        };
        //创建并发任务书
        const concurrencyList = new Array(Number(concurrency)).fill(0).map((item, index) => {
            return taskDetails(index); 
        });
        console.log('concurrencyList', concurrencyList);
        //并发请求
        Promise.all(concurrencyList).then((res) => {
            console.log('res', res);
            endTime = new Date().valueOf();
            setTime((endTime - startTime) / 1000);
        });
    };
    return (
        <div className={Css["concurrency"]}>
            <div>
                <label htmlFor='num'>请输入任务数量：</label><input type="number" name='num' value={num} onChange={e => {setNum(e.target.value);}}></input>
            </div>
            <div>
                <label htmlFor='concurrency'>请输入请求的并发数(谷歌浏览器支持最多6个的请求并发)：</label><input type="number" name='concurrency' value={concurrency} onChange={e => {setConcurrency(e.target.value);}}></input>
            </div>
            <div>
                请求花费时间：{time}s
            </div>
            <div className={Css['submit']} onClick={goRequest}>发起请求</div>
        </div>
    );
};
export default Concurrency;