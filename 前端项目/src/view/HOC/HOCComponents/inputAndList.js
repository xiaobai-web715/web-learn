import React, {useState, useEffect} from 'react';

const InputAndList = (WrappedComponent) => {
    //这一层的高阶组件是控制下拉显示状态的,以及点击下拉列表来更新对应列表中的value值
    return (props) => {
        let {selectData} = props;
        const [dropDown, setDropDown] = useState(false);
        //input组件聚焦的时候，修改对应的显示状态 dropDown
        const onFocus = () => {
            setDropDown(true);
        }
        //点击下拉列表的时候将对应的值传给inputValue
        const onSelect = (e) => {
            let value = e.target.getAttribute('value')
            setDropDown(false);
            selectData(value);
        }
        return(
            <WrappedComponent {...props} {...{dropDown, onFocus, onSelect}}></WrappedComponent>
        )
    }
}
export default InputAndList;