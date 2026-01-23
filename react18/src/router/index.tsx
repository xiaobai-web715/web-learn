import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import saga, { myMiddleWare1, myMiddleWare2 } from "src/reducer/saga";
import createSagaMiddleware  from 'redux-saga';
// configureStore 带来的好处是直接内置了 redux-thunk 和 redux-devtools-extension，这个 devtools 只要将 devTools: true 就可以直接使用。
import reducer from 'src/reducer/index.js';
import App from 'src/page/view/App';
const SelectIndex = lazy(() => import('src/page/view/SelectContent/index.js'));
const TableIndex = lazy(() => import('src/page/view/todoList/index'));
const ZendeskIndex = lazy(() => import('src/page/view/zendesk/index'));
const TouchByMiatask = lazy(() => import('src/page/view/touchByMiatask/index'));
const Charge = lazy(() => import('src/page/view/CSS动画/充电效果/index'));
const Button = lazy(() => import('src/page/view/CSS动画/button动画/index'));
const Posts = lazy(() => import('src/page/view/posts/PostsList'));
const SinglePostPage = lazy(() => import('src/page/view/posts/SinglePostPage'));
const EditPostForm = lazy(() => import('src/page/view/posts/EditPostForm'));
const HOC = lazy(() => import('src/page/view/HOC/index'));
const ReactRender = lazy(() => import('src/page/view/ReactRender/index'));
const UploadFile = lazy(() => import('src/page/view/uploadFile'));
const UpFile = lazy(() => import('src/page/view/upFile/upFile'));
const ScrollDate = lazy(() => import('src/page/view/ScrollDate/index'));
const ScreenShot = lazy(() => import('src/page/view/screenshot/index'));
const Squared = lazy(() => import('src/page/view/Squared/index'));
const CssProperty = lazy(() => import('src/page/view/CssProperty/index'));
const IntersectionObserverTest = lazy(() => import('src/page/view/IntersectionObserver/index'));

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware, myMiddleWare2, myMiddleWare1);
    }
});
sagaMiddleware.run(saga);
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
                                <Route
                                    path="intersection_observer"
                                    element={<IntersectionObserverTest></IntersectionObserverTest>}
                                ></Route>
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
