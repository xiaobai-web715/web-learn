import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from '../App';
const RouterIndex = () => {
    return(
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/*" element={<App/>}>
                    </Route>
                </Routes>
            </Router>
        </React.Fragment>
    );
}
export default RouterIndex;