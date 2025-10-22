import React from "react";
import doubler from "src/store/index";
import { observer } from "mobx-react-lite";
import Children from "./child";
const Mobax = observer(() => {
    console.log("我是获取的信息", doubler);
    return (
        <div>
            <Children />
            <button onClick={doubler.increment}>点击</button>
        </div>
    );
});

export default Mobax;