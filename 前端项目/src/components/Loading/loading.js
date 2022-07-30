import React from 'react'
import './loading.scss'
const Css = require('./loading.scss')

const LoadingIndex = () => {
    return(
        <>
            <div className={Css['loading-content']}>
                <div className={Css['content']}>
                    <div className={Css['image']}></div>
                </div>
            </div>
        </>
    )
}
export default LoadingIndex;