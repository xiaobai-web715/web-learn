import React, {useEffect} from 'react';
import Mouse from '../../components/Mouse/index'
import PaiMeng from './paiMeng/index'
import ClassZuJian from './Ref/classZuJian';
import FunctionZuJain from './Ref/functionZuJian';

const Index = () => {
    const HTMLRef = React.createRef();
    const FunctionRef = React.createRef();
    const ClassRef = React.createRef();
    useEffect(() => {
        console.log('我是HTML元素', HTMLRef);
        console.log('我是函数组件', FunctionRef);
        console.log('我是类组件', ClassRef);
    })
    return (
        <React.Fragment>
            <Mouse render={state => (<PaiMeng {...{state}}></PaiMeng>)}></Mouse>
            <div ref={HTMLRef}>我是HTML元素</div>
            <ClassZuJian ref={ClassRef}></ClassZuJian>
            <FunctionZuJain ref={FunctionRef}></FunctionZuJain>
        </React.Fragment>
    )
}
export default Index;