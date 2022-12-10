import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Concurrency from 'src/page/test/concurrency/concurrency';

const testRouter = () => {
    // const pathname = window.location.pathname;
    // let url = '';
    // if (pathname.indexOf('/test') > -1) {
    //     url = pathname.substring(pathname.indexOf('/', 1));
    // }
    // console.log('pathname => url：', pathname, url);
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path='/rn'>
                        <Route path='test'>
                            <Route path='concurrency' element={<Concurrency></Concurrency>}></Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </React.Fragment>
    );
};

export default testRouter;