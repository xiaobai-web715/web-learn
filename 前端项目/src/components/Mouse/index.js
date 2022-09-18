import React, {useState} from 'react';
import Css from './index.scss';
import PropTypes from 'prop-types';

const Mouse = (props) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const mouseMove = (e) => {
        setX(e.clientX);
        setY(e.clientY);
    };
    return (
        <React.Fragment>
            <div className={Css['mousePage']} onMouseMove={mouseMove}></div>
            {props.render({x, y})}
        </React.Fragment>
    );
};
Mouse.propTypes = {
    render: PropTypes.any,
};
export default Mouse;