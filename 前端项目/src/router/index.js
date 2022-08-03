import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from '../App';
import SelectIndex from '../view/SelectContent/index';
import TableIndex from '../view/todoList/index'
import ZendeskIndex from '../view/zendesk/index'
import Charge from '../view/CSS动画/充电效果/index'
const RouterIndex = () => {
    return(
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/*" element={<App/>}>
                        <Route path="select" element={<SelectIndex></SelectIndex>}></Route>
                        <Route path="todoList" element={<TableIndex></TableIndex>}></Route>
                        <Route path="zendesk" element={<ZendeskIndex></ZendeskIndex>}></Route>
                        <Route path="CSS/charge" element={<Charge></Charge>}></Route>
                    </Route>
                </Routes>
            </Router>
        </React.Fragment>
    );
}
export default RouterIndex;