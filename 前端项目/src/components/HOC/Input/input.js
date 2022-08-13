import React from 'react'
import Css from './input.scss'

const Input = (props, ref) => {
    let { value, selectData, dropDown, onFocus} = props;
    return (
        <React.Fragment>
            <div className={Css['position']}>
                <input value={value} onChange={(e) => {selectData(e.target.value)}} onFocus={onFocus} ref={ref}></input>
                <div className={dropDown? Css['iconPositionUp']: Css['iconPositionClose']}></div>
            </div>
        </React.Fragment>
    )
}

export default React.forwardRef(Input)