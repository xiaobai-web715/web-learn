import React, { useState, startTransition } from 'react';
import * as Utils from './utils';
import AnotherUtils from './utils';
import Test from './test';
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
        startTransition(() => {   
        setCount(count + 1)
          setEfficacy(!efficacy)
        })
      }}>count is: {count}</button>
      <div>{ efficacy ? '开' : '关'}</div>
      {
        Array.from({ length: 100 }).map((_, index) => {
          return <Test key={index} count={index + count} />
        })
      }
    </div>
  );
}

export default App;
