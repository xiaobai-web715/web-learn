import React, { useState, forwardRef, Ref, useImperativeHandle, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
export interface ItemRef {
    queryData: () => void;
}
let timerId;
const Item = forwardRef((props: {value: number}, ref: Ref<ItemRef>) => {
    const [ value, setValue ] = useState(0);
    // const queryData = debounce((isEffect?: boolean) => {
    //     console.log("触发了防抖的函数", props, isEffect && "useEffect进入");
    //     setValue(props.value * 2);
    // }, 500);
    const queryData = (isEffect?: boolean) => {
        console.log("触发了防抖的函数", props, isEffect && "useEffect进入");
        setValue(props.value * 2);
    };
    const queryDataCallback = useCallback(queryData, [props.value]);
    useEffect(() => {
        if (timerId) {
            clearInterval(timerId);
        }
        timerId = setInterval(() => {
            queryDataCallback(true);
        }, 1000);
    }, [props.value]);
    useImperativeHandle(ref, () => {
        return {
            queryData
        };
    }, [props.value]); // 仅初始化的时候执行一次
    return (
        <div>
            { value }
        </div>
    );
});

export default Item;