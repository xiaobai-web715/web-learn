import React from "react";
import { observer } from "mobx-react-lite";
import { useOtherStore } from "src/context";
const First = observer(() => {
    const otherStore = useOtherStore();
    return (
        <div>
            <button onClick={() => { otherStore.add(); }}>点击了{otherStore.count}次</button>
        </div>
    );
});

export default First;