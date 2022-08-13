import React from 'react'
import Input from '../../components/HOC/Input/input'
import List from '../../components/HOC/List/list'
import BootedDatas from './HOCComponents/bootedDatas'
import InputAndList from './HOCComponents/inputAndList'

const Index = (props) => {
    // 先简单了解一下 =》 高阶组件可以让我们的代码更具有复用性。
    let {data, dropDown, inputValue, onFocus, onSelect, selectData} = props;
    return (
        <React.Fragment>
            <Input {...{value: inputValue, selectData, dropDown, onFocus}}></Input>
            <List {...{data, dropDown, onClick: onSelect}}></List>
        </React.Fragment>
    )
}

export default BootedDatas(InputAndList(Index))