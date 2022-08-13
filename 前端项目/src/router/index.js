import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
// configureStore 带来的好处是直接内置了 redux-thunk 和 redux-devtools-extension，这个 devtools 只要将 devTools: true 就可以直接使用。
import reducer from "../reducer/index";
import App from '../App';
import SelectIndex from '../view/SelectContent/index';
import TableIndex from '../view/todoList/index'
import ZendeskIndex from '../view/zendesk/index'
import TouchByMiatask from '../view/touchByMiatask/index'
import Charge from '../view/CSS动画/充电效果/index'
import Posts from '../view/posts/PostsList'
import { SinglePostPage } from "../view/posts/SinglePostPage";
import { EditPostForm } from "../view/posts/EditPostForm";
import HOC from '../view/HOC/index'

const store = configureStore({
    reducer,
    devTools: true,
})
const RouterIndex = () => {
    return(
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/*" element={<App/>}>
                        <Route path="select" element={<SelectIndex></SelectIndex>}></Route>
                        <Route path="todoList" element={<TableIndex></TableIndex>}></Route>
                        <Route path="zendesk" element={<ZendeskIndex></ZendeskIndex>}></Route>
                        <Route path="touchByMiatask" element={<TouchByMiatask></TouchByMiatask>}></Route>
                        <Route path="CSS/charge" element={<Charge></Charge>}></Route>
                        <Route path="ReduxPosts" element={<Posts></Posts>}></Route>
                        <Route path='ReduxPosts/:postId' element={<SinglePostPage></SinglePostPage>}></Route>
                        <Route path='ReduxPosts/editPost/:postId' element={<EditPostForm></EditPostForm>}></Route>
                        <Route path="HOC" element={<HOC></HOC>}></Route>
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}
export default RouterIndex;