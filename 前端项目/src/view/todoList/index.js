import React, { useEffect, useState, useRef, useCallback} from 'react';
import useStateCallBack from '../../components/useStateCallback/index';
import axios from 'axios';
import Loading from '../../components/Loading/loading';
import Header from '../../components/Input/index';
import Content from '../../components/Input/index';
const Css = require('./index.scss');

const Index = () => {
    const [loading, setLoading] = useState(true);
    /* eslint-disable no-unused-vars */ //局部禁用规则(允许定义未被使用的变量)
    const [targetValue, setTargetValue] = useStateCallBack('');
    /* eslint-ensable no-unused-vars */
    const [list, setList] = useState([]);
    const [checkValue, setCheckValue] = useState([]);
    const inputContent = useRef();
    const listFn = useCallback(() => {
        axios.get('/api/todo/todoList').then((res) => {
            if(res.status === 200){
                let data = res.data.list;
                setLoading(false);
                setList(data);
            }
        });
    }, []);
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
                    // objValue.current.taskId = state.length + 1;
                    //这里要修改一下
                    objValue.current.taskId = state.lenght > 0 ? state[state.length-1].taskId + 1: 1;
                    axios({
                        method: 'post',
                        url: '/api/todo/addList',
                        data: objValue.current
                    }).then(res => {
                        if (res.status === 200) {
                            alert(res.data.message);
                        } else {
                            alert(res.data.message);
                        }
                    });
                    return [...state, {...objValue.current}];
                });
            }
        });
    }, []);
    const target = (val) => {
        //新建
        setTargetValue(val , (val) => {
            objValue.current.value = val;
        });
    };
    const checkStyle = (e) => {
        // e.target.previousSibling.style = 'display: none'; //这样的情况也是可以实现的
        if(Css['buttonExit'] === e.target.className){
            e.target.style = 'display: none';
            e.target.parentNode.firstChild.style = 'display: inline-block';
            e.target.parentNode.firstChild.focus();
            e.target.previousSibling.style = 'display: none'; 
        }
    };
    const blur = (e, item) => {
        e.target.nextSibling.style = 'display: inline-block';
        e.target.style = 'display: none';
        //然后控制对应的编辑button产生
        let childs = e.target.parentNode.childNodes;
        childs.forEach((node) => {
            if(Css['buttonExit'] === node.className){
                node.style = '';
            }
        });
        if(e.target.value !== ''){
            list.forEach((row) => {
                if(row.taskId == item.taskId){
                    row.value = e.target.value;
                }
            });
        }else{
            alert('任务不能为空');
        }
        setList([...list]);
    };
    const deleteWork = (row) => {
        //confirm与alert一样
        if(confirm('确认删除吗')){
            let listTarget = list.filter((item) => {
                return item.taskId !== row.taskId;
            });
            listTarget.forEach((item, index) => {
                item.taskId = index;
            });
            setList([...listTarget]);
            //对checkValue的值进行判断
            let checkValueCopy = checkValue.filter((item) => parseInt(item) !== parseInt(row.taskId));
            setCheckValue([...checkValueCopy]);
            axios({
                method: 'post',
                url: '/api/todo/deleteList',
                data: {
                    taskId: row.taskId
                }
            }).then(res => {
                if (res.status === 200) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            });
        }
    };
    const checkBox = (e) => {
        let taskId = e.target.value;
        let list = [...checkValue];
        if(list.length === 0){
            list.push(taskId);
        }else{
            let choose = checkValue.some((item) => parseInt(item) === parseInt(taskId));
            if(choose){
                list = checkValue.filter((item) => item !== taskId);
            }else{
                list.push(taskId);
            }
        }
        setCheckValue([...list]);
    };
    const deleteAll = () => {
        let listTarget = list.filter((list) => {
            let target = checkValue.some((item) => parseInt(item) === parseInt(list.taskId));
            return !target;
        });
        setList([...listTarget]);
        setCheckValue([]);
    };
    return(
        <div className={Css['todoList']}>
            <div className={Css['header']}>
                <Header refContent={inputContent} placeholder='请输入你的任务名称 并按回车' onChange={target}></Header>
            </div>
            {list.length > 0 ? <div className={Css['content']} onClick={checkStyle}>
                {
                    list.map((item) => {
                        return(
                            <div className={Css['box']} key={item.value + item.taskId}>
                                <Content defaultValue={item.value} onBlur={blur} row={item}></Content>
                                <p>{item.value}</p>
                                <button className={Css['buttonExit']}>编辑</button>
                                <button className={Css['buttonDelete']} onClick={deleteWork.bind(null, item)}>删除</button>
                                <input className={Css['checkout']} type='checkbox' value={item.taskId} onChange={checkBox}></input>
                            </div>
                        );
                    })
                }
            </div> : ''}
            <div className={Css['footer']}>
                <div>{`已完成${checkValue.length} / 全部${list.length}`}</div>
                <button className={Css['delete']} onClick={deleteAll}>清除已完成任务</button>
            </div>
            {
                loading ? (
                    <Loading></Loading>
                ) : ''
            }
        </div>
    );
};
export default Index;