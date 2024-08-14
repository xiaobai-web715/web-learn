import React, { useEffect } from "react";
import Css from './index.scss';

const CssProperty = () => {
    useEffect(() => {
        console.log("css property功能测试页面");
    }, []);
    return (
        <div className={Css["debug"]}>
            <div className={Css['propertyBox']}>
                <div className={Css["property"]} data-id="--scroll-position"></div>
                <div className={Css["property"]} data-id="--scroll-position-delayed"></div>
                <div className={Css["property"]} data-id="--scroll-velocity"></div>
            </div>
            <div className={Css['modal']}></div>
        </div>
    );
};

export default CssProperty;