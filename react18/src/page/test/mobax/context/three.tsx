import React from "react";
import { useOtherStore } from "src/context";
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";

const Three = observer(() => {
    const otherStore = useOtherStore();
    const addArrInfo = () => {
        otherStore.arr[3] = 3;
    };
    autorun(() => {
        console.log("监听到数组长度的变化", otherStore.arr.length);
    });
    return (
        <div>
            <button onClick={() => { addArrInfo(); }}>更改arr</button>
            {
                otherStore.arr.map((item, index) => {
                    return <div key={index}>{`${item}-${otherStore.name}`}</div>;
                })
            }
            <button onClick={() => { otherStore.name = 'ldh'; }}>更改name</button>
        </div>
    );
});

export default Three;