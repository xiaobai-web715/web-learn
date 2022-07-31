import React, {useEffect, useState} from 'react'
const Css = require('./index.scss')

const Index = (props) => {
    let {defaultValue = '', row = ''} = props;
    const [value, setValue] = useState(defaultValue)
    const changeValue = (e) => {
        let value = e.target.value;
        setValue(value)
        if(typeof props.onChange === 'function'){
            props.onChange(value);
        }
    }
    const blurValue = (e) => {
        if(typeof props.onBlur === 'function'){
            props.onBlur(e, row);
        }
    }
    useEffect(() => {
        setValue(defaultValue)
    }, [props])
    return (
    <React.Fragment>
        <input className={Css['input']} ref={props.refContent} type='text' value={value} placeholder={props.placeholder} onChange={changeValue} onBlur = {blurValue}></input>
    </React.Fragment>
    )
}

export default Index