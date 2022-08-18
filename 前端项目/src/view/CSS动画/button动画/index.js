import React from 'react'
import Css from './index.scss';

const Index = () => {
  return (
    <div className={Css['position']}>
        <button className={Css['button']}>
            <div className={Css['center']}><div>前往订阅</div></div>
        </button>
    </div>
  )
}

export default Index;