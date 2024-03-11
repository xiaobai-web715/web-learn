import React, { memo } from "react";

let currentFn;
const ChangeCount = memo((props: {setCountFn: Function}) => {
  console.log("我因为函数的变化而执行了");
  const { setCountFn } = props;
  if (currentFn === null) {
    currentFn = setCountFn;
  } else {
    console.log("函数有没有发生变化", currentFn === setCountFn);
  }
  return <button onClick={setCountFn}>{"点击增加计数"}</button>;
});

ChangeCount.displayName = 'ChangeCount';

export default ChangeCount;
