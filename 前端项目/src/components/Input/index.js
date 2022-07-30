import React, {useState} from 'react'
const Css = require('./index.scss')

const Index = (props) => {
    let {defaultValue = ''} = props;
    const [value, setValue] = useState(defaultValue)
    const changeValue = (e) => {
        let value = e.target.value;
        setValue(value);
        props.onChange(value);
    }
    return (
    <React.Fragment>
        <input ref={props.refContent} type='text' value={value} placeholder={props.placeholder} onChange={changeValue}></input>
    </React.Fragment>
    )
}

export default Index