import React from 'react'
import { useNavigate , Outlet} from 'react-router-dom';
const Css = require('./App.scss')

const App = (props) => {
    console.log('props', props);
    const navigate = useNavigate()
    const goPage = (url) => {
        navigate(url);
    }
    return(
        <React.Fragment>
            <div className={Css['page']}>
                <div className={Css['tabnv']}>
                    <div onClick={goPage.bind(null, 'select')}>下拉框</div>
                    <div onClick={goPage.bind(null, 'todoList')}>todoList</div>
                    <div onClick={goPage.bind(null, 'zendesk')}>zendesk</div>
                    <div onClick={goPage.bind(null, 'touchByMiatask')}>点击事件防止误触</div>
                    <div onClick={goPage.bind(null, 'CSS/charge')}>css充电动画</div>
                    <div onClick={goPage.bind(null, 'ReduxPosts')}>redux官网示例</div>
                </div>
                <div className={Css['content']}>
                    <Outlet/>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;