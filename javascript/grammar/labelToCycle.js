// 标签语句 一般用于嵌套循环
const test = () => {
  labelFor: for (let i = 3; i >= 0; i--) {
    switch (i) {
      case 3:
      case 1:
        continue labelFor;
      // break;
      case 2:
      case 0:
        break;
    }
    console.log("打印值情况", i);
  }
};
test();
