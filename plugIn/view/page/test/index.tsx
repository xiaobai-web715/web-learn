import React from "react";
import {Button} from 'antd'

const Test = () => {
    const testClick = () => {
        console.log("我触发点击事件了")
    }
    return (
        <div>
            <Button type="primary" onClick={testClick}>点击一下啊</Button>
        </div>
    )
}

export default Test