import React, { useState, startTransition } from 'react';
import Test from './test';
import './App.css';

function App() {
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
      {
        Array.from({ length: 50 }).map((_, index) => {
          return <Test key={index} count={index + count} />
        })
      }
    </div>
  );
}

export default App;
