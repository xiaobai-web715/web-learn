import React from 'react'
import Css from './input.scss'

const Input = (props) => {
    let { value, selectData, dropDown, onFocus} = props;
    console.log('value', value);
    return (
        <React.Fragment>
            <div className={Css['position']}>
                <input value={value} onChange={(e) => {selectData(e.target.value)}} onFocus={onFocus}></input>
                <div className={dropDown? Css['iconPositionUp']: Css['iconPositionClose']}></div>
            </div>
        </React.Fragment>
    )
}

export default Input