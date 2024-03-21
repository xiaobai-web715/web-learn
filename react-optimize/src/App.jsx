/*
 * @Author: ***
 * @Date: 2023-12-04 12:31:54
 * @LastEditTime: 2024-03-17 20:15:15
 * @LastEditors: ***
 * @Description:
 * @FilePath: \web-learn\react-optimize\src\App.jsx
 * 加油搞起来
 */
import React, { useCallback, useState } from "react";
import ChangeCount from "./changeCount.tsx";
import Iframe from "./shadowDom/analog.tsx";
import { faker } from "@faker-js/faker"
import "./shadDom/index.ts";
import "./App.css";
import "./shadDom/blogHeader.scss";

function App() {
  const [count, setCount] = useState(0);
  // 测试一下useState接收一个函数作为参数会不会立即执行
  const [myPromise, setMyPromise] = useState(() => createPromise())
  let news = [...new Array(4)].map(() => faker.lorem.sentence());
  console.log("我是news", news, setMyPromise);
  function createPromise () {
    console.log("我是执行了")
    return new Promise((resolve) => {
      setTimeout(() => {
        news.unshift(faker.lorem.sentence());
        resolve(news)
      }, 1000)
    })
  }
  console.log("myPromise", myPromise);
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
      <blog-header></blog-header>
      <article>shawdom外面的article元素</article>
    </div>
  );
}

export default App;
