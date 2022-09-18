import React from 'react';
import Css from './input.scss';
import PropTypes from 'prop-types';

const Input = (props, ref) => {
    let { value, selectData, dropDown, onFocus} = props;
    return (
        <React.Fragment>
            <div className={Css['position']}>
                <input value={value} onChange={(e) => {selectData(e.target.value);}} onFocus={onFocus} ref={ref}></input>
                <div className={dropDown? Css['iconPositionUp']: Css['iconPositionClose']}></div>
            </div>
        </React.Fragment>
    );
};
// const InputForwardRef = React.forwardRef(Input);
// InputForwardRef.displayName = 'Input';
Input.propTypes = {
    value: PropTypes.any,
    selectData: PropTypes.any,
    dropDown: PropTypes.any,
    onFocus: PropTypes.any,
};

export default React.forwardRef(Input);