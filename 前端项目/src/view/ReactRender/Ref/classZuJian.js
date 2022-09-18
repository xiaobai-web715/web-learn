import React from 'react';

class ClassZuJian extends React.Component{
    constructor(props){
        super(props);
        this.localeTest();
    }
    localeTest(){
        console.log('this', this);
    }
    render(){
        return (
            <div>我是class组件</div>
        );
    }
}

export default ClassZuJian;