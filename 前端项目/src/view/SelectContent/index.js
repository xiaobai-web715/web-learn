import React from 'react'
import Select from '../../components/Select'
const Css = require('./index.scss')

const Index = () => {
    const selectValue = (value) => {
        alert(value) //适用组件的地方可以通过回调函数的方式获取到选择的值
    }
  return (
    <div id='selectPage'>
        {/* Select可以接收的参数
                options:代表你的下拉框中所需要的值 array //必传
                num:代表当下拉框最多展示的长度(超过部分滚动,默认是6) number //非必传
                onChange:(e) => {} func //必传 e是返回的你选择的值
                palceholder:代表你想在筛选框框中看到的初始底层文字 string//非必传 默认'请选择你想选择的内容'
                root:代表你使用的select页面的根节点的id值 string//必传
         */}
        <Select root='selectPage' placeholder='请选择你最喜欢的电影' options={['当幸福来敲门' , '阿甘正传' , '肖申克的救赎', '图灵' , '灵魂之旅', '你的名字' , '天气之子', '秒速五厘米']} num={7} onChange={selectValue}/>
        <div className={Css['bg-1']}></div>
        <div className={Css['select-2']}>
          <Select root='selectPage' placeholder='请选择你最讨厌的电影' options={['当幸福来敲门' , '阿甘正传' , '肖申克的救赎', '图灵' , '灵魂之旅', '你的名字' , '天气之子', '秒速五厘米']} num={4} onChange={selectValue}/>
        </div>
        <div className={Css['bg-s']}></div>
    </div>
  )
}

export default Index