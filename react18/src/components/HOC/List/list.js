import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const List = (props) => {
    //List组件接收数据进行显示, 根据状态显示或者不显示, 点击之后会返回一个状态给上层组件
    let {data, dropDown, onClick} = props;
    console.log('data', data);
    return (
        <div>
            {
                dropDown ? (
                    <ul onClick={onClick}>
                        {
                            Array.isArray(data)? data.map(item => {
                                return (
                                    <li key={item} value={item}>{item}</li>
                                );
                            }): ''
                        }
                    </ul>
                ) : ''
            }
        </div>
    );
};
List.propTypes = {
    data: PropTypes.any,
    onClick: PropTypes.any,
    dropDown: PropTypes.any,
};

export default List;