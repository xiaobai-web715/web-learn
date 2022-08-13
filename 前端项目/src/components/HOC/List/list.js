import React from 'react'
import Css from './index.scss'

const List = (props) => {
    //List组件接收数据进行显示, 根据状态显示或者不显示, 点击之后会返回一个状态给上层组件
    let {data, dropDown, onClick} = props
    return (
        <div>
            {
                dropDown ? (
                    <ul onClick={onClick}>
                        {
                            Array.isArray(data)? data.map(item => {
                                return (
                                    <li key={item} value={item}>{item}</li>
                                )
                            }): ''
                        }
                    </ul>
                ) : ''
            }
        </div>
    )
}

export default List