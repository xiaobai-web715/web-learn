import React from 'react';
import Input from 'src/components/HOC/Input/input';
import List from 'src/components/HOC/List/list';
import BootedDatas from './HOCComponents/bootedDatas';
import InputAndList from './HOCComponents/inputAndList';
import PropTypes from 'prop-types';

// ref和key一样并不能透传到组件内部 => 但是可以用高阶组件React.forwardRef来将ref传进组件里面
const Index = (props, ref) => {
    console.log('props', props);
    // 先简单了解一下 =》 高阶组件可以让我们的代码更具有复用性。
    let {data, dropDown, inputValue, onFocus, onSelect, selectData} = props;
    return (
        <React.Fragment>
            <Input {...{value: inputValue, selectData, dropDown, onFocus, ref}}></Input>
            <List {...{data, dropDown, onClick: onSelect}}></List>
        </React.Fragment>
    );
};

// const IndexForwardRef = React.forwardRef(Index);
// IndexForwardRef.displayName  = 'Index';

Index.propTypes = {
    data: PropTypes.any,
    dropDown: PropTypes.any,
    onSelect: PropTypes.any,
    inputValue: PropTypes.any,
    onFocus: PropTypes.any,
    selectData: PropTypes.any,
};

export default BootedDatas(InputAndList(React.forwardRef(Index)));