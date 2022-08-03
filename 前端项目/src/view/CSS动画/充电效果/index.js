import React from 'react'
const Css = require('./index.scss')

const Index = () => {
  return (
    <div className={Css['page']}>
        我初始就没陈宫
        <div className={Css['source']}></div>
        <div className={Css['electric']}></div>
    </div>
  )
}

export default Index