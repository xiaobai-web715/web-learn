import React from 'react';
import { useNavigate , Outlet} from 'react-router-dom';
const Css = require('./App.scss');

const App = () => {
    const navigate = useNavigate();
    const goPage = (url: string) => {
        navigate(url);
    };
    return(
        <React.Fragment>
            <div className={Css['page']}>
                <div className={Css['tabnv']}>
                    <div onClick={goPage.bind(null, '/course/select')}>下拉框</div>
                    <div onClick={goPage.bind(null, '/course/todoList')}>todoList</div>
                    <div onClick={goPage.bind(null, '/course/zendesk')}>zendesk</div>
                    <div onClick={goPage.bind(null, '/course/touchByMiatask')}>点击事件防止误触</div>
                    <div onClick={goPage.bind(null, '/course/CSS/charge')}>css充电动画</div>
                    <div onClick={goPage.bind(null, '/course/CSS/button')}>button动画</div>
                    <div onClick={goPage.bind(null, '/course/ReduxPosts')}>redux官网示例</div>
                    <div onClick={goPage.bind(null, '/course/HOC')}>HOC</div>
                    <div onClick={goPage.bind(null, '/course/ReactRender')}>ReactRender</div>
                    <div onClick={goPage.bind(null, '/course/UploadFile')}>UploadFile</div>
                    <div onClick={goPage.bind(null, '/course/upFile')}>upFile</div>
                </div>
                <div className={Css['content']}>
                    <Outlet/>
                </div>
            </div>
        </React.Fragment>
    );
};
export default App;