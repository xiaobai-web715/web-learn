import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// configureStore 带来的好处是直接内置了 redux-thunk 和 redux-devtools-extension，这个 devtools 只要将 devTools: true 就可以直接使用。
import reducer from 'src/reducer/index.js';
import App from 'src/page/view/App';
import SelectIndex from 'src/page/view/SelectContent/index.js';
import TableIndex from 'src/page/view/todoList/index';
import ZendeskIndex from 'src/page/view/zendesk/index';
import TouchByMiatask from 'src/page/view/touchByMiatask/index';
import Charge from 'src/page/view/CSS动画/充电效果/index';
import Button from 'src/page/view/CSS动画/button动画/index';
import Posts from 'src/page/view/posts/PostsList';
import { SinglePostPage } from 'src/page/view/posts/SinglePostPage';
import { EditPostForm } from 'src/page/view/posts/EditPostForm';
import HOC from 'src/page/view/HOC/index';
import ReactRender from 'src/page/view/ReactRender/index';
import UploadFile from 'src/page/view/uploadFile';
import UpFile from 'src/page/view/upFile/upFile';
import ScrollDate from 'src/page/view/ScrollDate/index';
import ScreenShot from 'src/page/view/screenshot/index';
import Squared from 'src/page/view/Squared/index';
import CssProperty from 'src/page/view/CssProperty/index';

const store = configureStore({
    reducer,
    devTools: true,
});
function RouterIndex() {
    console.log('我没有执行吗');
    console.log('乾坤属性', window.__POWERED_BY_QIANKUN__);
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="app-react">
                            <Route path="app">
                                <Route path="select" element={<SelectIndex></SelectIndex>}></Route>
                                <Route path="todoList" element={<TableIndex></TableIndex>}></Route>
                                <Route path="zendesk" element={<ZendeskIndex></ZendeskIndex>}></Route>
                                <Route path="touchByMiatask" element={<TouchByMiatask></TouchByMiatask>}></Route>
                                <Route path="CSS/charge" element={<Charge></Charge>}></Route>
                                <Route path="CSS/button" element={<Button></Button>}></Route>
                                <Route path="ReduxPosts" element={<Posts></Posts>}></Route>
                                <Route path="ReduxPosts/:postId" element={<SinglePostPage></SinglePostPage>}></Route>
                                <Route
                                    path="ReduxPosts/editPost/:postId"
                                    element={<EditPostForm></EditPostForm>}
                                ></Route>
                                <Route path="HOC" element={<HOC></HOC>}></Route>
                                <Route path="ReactRender" element={<ReactRender></ReactRender>}></Route>
                                <Route path="UploadFile" element={<UploadFile></UploadFile>}></Route>
                                <Route path="upFile" element={<UpFile></UpFile>}></Route>
                                <Route path="scrollDate" element={<ScrollDate></ScrollDate>}></Route>
                                <Route path="screenShot" element={<ScreenShot></ScreenShot>}></Route>
                                <Route path="squared" element={<Squared></Squared>}></Route>
                                <Route path="css_property" element={<CssProperty></CssProperty>}></Route>
                            </Route>
                        </Route>
                        <Route path="*" element={<div>当前页面不存在</div>}></Route>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}
export default RouterIndex;
