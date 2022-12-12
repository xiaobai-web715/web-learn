import React, {useRef} from 'react';
import Css from './index.scss';
import PropTypes from 'prop-types';

//useEffect是在render之后,所以你的原意是想将带有位置的style放入render执行的虚拟DOM对象当中
//但因为顺序问题，你每次放入的style都是null,然后useEffect更新style的时候又不是一个状态,所以又不会引发组件重新渲染(所以没用啊)
const Index = (props) => {
    const position = useRef();
    // position.current ?.style = `left: ${props.state.x}`; =>这种写法需要loader进行解析
    if(position.current){
        position.current.style.cssText = `transform : translate(${props.state.x}px, ${props.state.y}px);`;
    }
    return (
        <div ref={position} className={Css['paiMeng']}>
            {/* 这里是因为webpack的原因所以引入图片的时候要后面跟一个default,或者是通过import的方式导入图片https://zhuanlan.zhihu.com/p/262272714 */}
            <img src={require('../image/派蒙.png').default}></img>
        </div>
    );
};

Index.propTypes = {
    state: PropTypes.any,
};

export default Index;