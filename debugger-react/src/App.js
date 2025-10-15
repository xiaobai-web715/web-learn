import React, { useState } from 'react';
import * as Utils from './utils';
import AnotherUtils from './utils';
import './App.css';

function App() {
  console.log("===Utils", Utils)
  console.log("===AnotherUtils", AnotherUtils)
  debugger
  const [count, setCount] = useState(0);
  const [efficacy, setEfficacy] = useState(true)
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
        setEfficacy(!efficacy)
      }}>count is: {count}</button>
      <div>{ efficacy ? '开' : '关'}</div>
    </div>
  );
}

export default App;
