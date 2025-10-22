import doubler from "src/store/index";
import React from "react";
const Children = () => {
    return (
        <div>我是显示的值:{doubler.value}</div>
    );
};

export default Children;