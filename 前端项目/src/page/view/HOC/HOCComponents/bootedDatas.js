import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const BootedDatas = (WrappedComponent) => {
    //在这一层的高阶组件当中请求数据,保存value状态,并根据输入框中值来对数据进行筛选
    return () => {
        const [inputValue, setInputValue] = useState('');
        const [data, setData] = useState([]);
        let initital = useRef();
        useEffect(() => {
            //当然这里的url啥的也可以通过props的形式传递过来
            //let {url, params} = this.props;
            axios.get('/api/hoc').then((res) => {
                if(res.status == 200){
                    initital.current = res.data;
                    setData(res.data);
                }
            });
        }, []);
        //定义一个函数用来对Data数据进行筛选。
        const selectData = (val) => {
            let dataCopy = [...initital.current];
            let target = dataCopy.filter(item => {
                return item.indexOf(val) !== -1;
            });
            console.log('val', val, target);
            setData(target);
            //这一行加上致命
            //setData((state) => {console.log('我是state的回调函数', state, state === data, '这里不相同因为是引用值传进来的是拷贝了一下，所以指针变化了');});
            setInputValue(val);
        };
        return (
            <React.Fragment>
                <WrappedComponent {...{data, selectData, inputValue}}></WrappedComponent>
            </React.Fragment>
        );
    };
};
export default BootedDatas;