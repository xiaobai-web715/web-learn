import React, {useState, useRef} from 'react';

const InputAndList = (WrappedComponent) => {
    //这一层的高阶组件是控制下拉显示状态的,以及点击下拉列表来更新对应列表中的value值
    return (props) => {
        const input = useRef();
        const test = useRef();
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
            input.current.focus(); //不将ref作为普通的prop进行传递(就是以ref作为名字进行传递 => 这个时候会像key一样不能进行透传 => 可以使用React.forWard包裹你的组件进行透传)
        }
        return(
            <WrappedComponent {...props} {...{dropDown, onFocus, onSelect, ref: input, test}}></WrappedComponent>
        )
    }
}
export default InputAndList;