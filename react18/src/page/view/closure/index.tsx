import React, { useState, useRef, useEffect } from "react";
import Item, { ItemRef } from "./item";

const Closure = () => {
    const [ count, setCount ] = useState(0);
    const itemRef = useRef<ItemRef>(null);
    const triggerControll = () => {
        setCount(count + 1);
    };
    useEffect(() => {
        itemRef.current?.queryData();
    }, [count]);
    return (
        <div>
            <button onClick={ triggerControll }>点击次数：{count}</button>
            <Item ref={ itemRef } value={count}></Item>
        </div>
    );
};

export default Closure;