import React, { useEffect, useState } from 'react';
import { useNavigate , Outlet} from 'react-router-dom';
const Css = require('./App.scss');

const App = () => {
    console.log('我是微前端');
    const [router, setRouter] = useState<string>('');
    const navigate = useNavigate();
    const goPage = (url: string) => {
        navigate('/app-react/app' + url);
        if(window.__POWERED_BY_QIANKUN__){
            setRouter('/app-react/app' + url);
        }
    };
    useEffect(() => {console.log('我执行了几次');}, []);
    useEffect(() => {
        console.log('router', router);
        if (router) {
            if (window.__POWERED_BY_QIANKUN__) {
                window.history.pushState(null, '', router);
            } else {
                navigate(router);
            }
        }
    }, [router]);
    return(
        <React.Fragment>
            <div className={Css['page']}>
                <div className={Css['tabnv']}>
                    <div onClick={goPage.bind(null, '/select')}>下拉框</div>
                    <div onClick={goPage.bind(null, '/todoList')}>todoList</div>
                    <div onClick={goPage.bind(null, '/zendesk')}>zendesk</div>
                    <div onClick={goPage.bind(null, '/touchByMiatask')}>点击事件防止误触</div>
                    <div onClick={goPage.bind(null, '/CSS/charge')}>css充电动画</div>
                    <div onClick={goPage.bind(null, '/CSS/button')}>button动画</div>
                    <div onClick={goPage.bind(null, '/ReduxPosts')}>redux官网示例</div>
                    <div onClick={goPage.bind(null, '/HOC')}>HOC</div>
                    <div onClick={goPage.bind(null, '/ReactRender')}>ReactRender</div>
                    <div onClick={goPage.bind(null, '/UploadFile')}>UploadFile</div>
                    <div onClick={goPage.bind(null, '/upFile')}>upFile</div>
                    <div onClick={goPage.bind(null, '/scrollDate')}>日期选择器</div>
                    <div onClick={() => goPage('/screenShot')}>数据可视化</div>
                </div>
                <div className={Css['content']}>
                    <Outlet/>
                </div>
            </div>
        </React.Fragment>
    );
};
export default App;