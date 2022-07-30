import React, {useState, useEffect, useRef} from 'react'

const Index = (val) => {
    const [value, setValue] = useState(val);
    const refFn = useRef()
    const setCallback = (val, callback) => {
        setValue(val); //获取最新状态值
        refFn.current = callback
    }
    useEffect(() => {
        if(typeof refFn.current === 'function'){
            refFn.current(value);
        }
    }, [value])
    return [value , setCallback]
}

export default Index