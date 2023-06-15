import React from 'react';
const Css = require('./index.scss');

const Index = () => {
  return (
    <div className={Css['page']}>
        <div className={Css['source']}>
          <div className={Css['content']}></div>
          <div className={Css['filing']}>80%</div>
        </div>
        <div className={Css['electric']}></div>
        <div>
          <div className={Css['bubble']}></div>
          <div className={Css['bubble']}></div>
          <div className={Css['bubble']}></div>
          <div className={Css['bubble']}></div>
        </div>
    </div>
  );
};

export default Index;