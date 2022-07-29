import React, {useEffect, useState} from 'react'
import Loading from './components/Loading/loading'
// axios会自动转换 JSON 数据
import axios from 'axios'

const App = () => {
    const [value, setValue] = useState({});
    const [loading, setLoading] = useState(true);
    //现在要模拟一个东西(就是我的请求放在useEffect里面),顺序执行逻辑用到这个值
    const valueData = (value) => {
        console.log('value', value);
        if(value.status === 200){
            return value.data;
        }else{
            throw new Error('请求出错');
        }
    }
    useEffect(() => {
        const request = () => {
            axios.get('api').then(valueData).then((res) => {
                setValue(res); //这里将状态进行更新
                setLoading(false);
            }).catch((err) => {
                console.log('err', err);
            })
        }
        request()
    }, []);
    //对于react来说本身的setValue是在render之前(也就是不能够立即访问到相应的变化)
    return (
        <>
            <button>点击发起请求</button>
            {
                loading ?  
                <div className='loading'>
                    <Loading></Loading>
                </div> : ''
            } 
        </>
    )
}

export default App