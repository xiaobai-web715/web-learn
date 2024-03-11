import React, { useCallback, useState } from "react";
import ChangeCount from "./changeCount.tsx";
import Iframe from './shadowDom/analog.tsx';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const setCountFn = useCallback(() => {
    setCount((val) => val + 1);
  }, []);
  return (
    <div className="App">
      <div>
        {"count:"}
        {count}
      </div>
      <ChangeCount setCountFn={setCountFn}></ChangeCount>
      <Iframe></Iframe>
    </div>
  );
}

export default App;
