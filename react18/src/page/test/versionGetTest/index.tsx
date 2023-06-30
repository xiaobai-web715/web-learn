import React from 'react';
import axios from 'axios';

const Index = () => {
    const serialize = (form) => {
        const formEles = form.elements;
        console.log('我是序列化目标', form, formEles);
        const params = {};
        for (const field of formEles) {
            switch(field.type) {
                default: 
                    if (field.name.length > 0) {
                        params[field.name] = field.value;
                    }
            }
        }
        console.log('我是序列化之后的值', params);
        // ajax进行表单提交
        axios.post(
            '/api/test/getAppVersion',
            params
        ).then((res) => {
            console.log('我是返回的信息', res);
        });
    };
    const submit = (e) => {
        e.preventDefault(); //阻止提交的默认事件
        console.log('数据提交', [e]);
        serialize(e.target);
        return false;
    };
    return (
        <div>
            <form onSubmit={submit}>
                <label>输入应用名称</label>
                <input placeholder='请输入应用名称' name='name'></input><br/>
                <label>输入应用版本号</label>
                <input placeholder='情输入应用版本号' name='version'></input><br/>
                <input type='submit'></input>
            </form>
        </div>
    );
};

export default Index;