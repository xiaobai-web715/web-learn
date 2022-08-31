import React from 'react'
import Css from './index.scss';
import AdaptationTroll from '../Css自适应轮播动画/index'

const Index = () => {
  return (
    <div>
        <AdaptationTroll></AdaptationTroll>
        <div className={Css['position']}>
            <button className={Css['button']}>
                <div className={Css['center']}>
                    <div>前往订阅</div>
                </div>
                <div className={Css['discount']}>
                    <div>低至5.5折!</div>
                </div>
            </button>
        </div>
    </div>
  )
}

export default Index;