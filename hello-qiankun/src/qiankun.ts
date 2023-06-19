import { registerMicroApps, setDefaultMountApp } from "qiankun";
registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:3000',
        container: '#yourContainer',
        activeRule: '/app-react'
    },
    {
        name: 'vueApp',
        entry: '//localhost:5173',
        container: '#yourContainer',
        activeRule: '/hospSet'
    }
]);
setDefaultMountApp('/app-react');
