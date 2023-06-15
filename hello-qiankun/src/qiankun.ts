import { registerMicroApps, start, setDefaultMountApp } from "qiankun";
registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:3000',
        container: '#yourContainer',
        activeRule: '/app-react'
    }
]);
setDefaultMountApp('/app-react');
//启动qiankun
start();
console.log('我是乾坤启动...');
