import React, { useEffect, useState, useRef, useCallback} from 'react'
import useStateCallBack from '../../components/useStateCallback/index'
import axios from 'axios'
import Loading from '../../components/Loading/loading'
import Header from '../../components/Input/index'
import Content from '../../components/Input/index'
const Css = require('./index.scss')

const Index = () => {
    const [loading, setLoading] = useState(true);
    const [targetValue, setTargetValue] = useStateCallBack('');
    const [list, setList] = useState([]);
    const inputContent = useRef()
    const listFn = useCallback(() => {
        axios.get('/api/todoList').then((res) => {
            if(res.status === 200){
                let data = res.data.list;
                setLoading(false);
                setList(data);
            }
        })
    }, [])
    let objValue = useRef({}); //这里要拿useRef包一下 =》 要不然每一次刷新都是{}
    useEffect(() => {
        listFn();
        inputContent.current.addEventListener('keydown', (e) => {
            if(e.code === 'Enter'){
                //这里原本的逻辑应该是像服务器发送数据然后再刷新页面现在没法实现(就先模拟一下)
                // console.log(targetValue, list);
                // let obj = {
                //     taskId : list.length,
                //     value : targetValue,
                // } //这里这个样子是拿不到最新值的 =》在平常的定时函数里面写回调拿外作用域的值每次调用都是一个赋值的过程。
                // console.log('obj拿不到最新值', obj);
                setList((state) => {
                    objValue.current.taskId = state.length;
                    return [...state, objValue.current];
                })
            }
        })
    }, [])
    const target = (val) => {
        if(typeof taskId !== 'undefined'){
            //修改任务值 => 怎样不改变公共组件input达到
        }else{
            //新建
            setTargetValue(val , (val) => {
                objValue.current.value = val
            });
        }
    }
    return(
        <React.Fragment>
            <div className={Css['header']}>
                <Header refContent={inputContent} placeholder='添加任务' onChange={target}></Header>
            </div>
            <div className={Css['content']}>
                {
                    list.map((item) => {
                        return(
                            <Content key={item.value} defaultValue={item.value}></Content>
                        )
                    })
                }
            </div>
            {
                loading ? (
                    <Loading></Loading>
                ) : ''
            }
        </React.Fragment>
    )
}
export default Index;