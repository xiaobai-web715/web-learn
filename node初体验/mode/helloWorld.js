#!/usr/bin/env node(不知道这样为啥是乱码)
// shebang(告诉系统通过哪种解释器运行脚本)
console.log('helloWorld');
console.log('process提供了env属性,承载了在启动进程时设置的所有环境变量',process.env)
console.log(process.env.NODE_ENV)
process.env.NODE_ENV = 'production';
console.log(process.env.NODE_ENV)

//Progress可以在控制台当中创建进度条
const ProgressBar = require('progress');
const bar = new ProgressBar(':bar', {total : 10});
const timer = setInterval(() => {
    bar.tick()
    if(bar.complete){
        clearInterval(timer);
    }
} , 100);

//使用node.js CLI程序具有交互性 (这段代码会询问用户名,输入后并回车则会发送问候语)
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
// readline.question()会接收两个参数,第一个参数是终端显示的问题,等待用户输入然后执行回调函数
readline.question('你叫什么名字?', name => {
    console.log(`你好${name}!`);
    readline.close();
})