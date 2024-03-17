/*
 * @Author: ***
 * @Date: 2023-12-04 12:31:54
 * @LastEditTime: 2024-02-25 15:29:09
 * @LastEditors: ***
 * @Description:
 * @FilePath: \web-learn\react-optimize\src\App.jsx
 * 加油搞起来
 */
import React, { useCallback, useState } from "react";
import ChangeCount from "./changeCount";
import "./shadDom/index.ts";
import "./App.css";
import "./shadDom/blogHeader.scss";

function App() {
  const [count, setCount] = useState(0);
  // const setCountFn = () => {
  //   setCount((val) => val + 1);
  // };
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
      <blog-header></blog-header>
      <article>shawdom外面的article元素</article>
    </div>
  );
}

export default App;
