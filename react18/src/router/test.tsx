import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Concurrency from 'src/page/test/concurrency/concurrency';
import OperationPosition from 'src/page/test/operationPosition/index';
import VersionGetTest from 'src/page/test/versionGetTest/index';
import Mobax from 'src/page/test/mobax/index';
import MobaxContext from 'src/page/test/mobax/context/index';
import { OtherStore, OtherStoreContext } from "src/context/index";

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
                    <Route path='/app-react'>
                        <Route path='test'>
                            <Route path='concurrency' element={<Concurrency></Concurrency>}></Route>
                            <Route path='operationPosition' element={<OperationPosition></OperationPosition>}></Route>
                            <Route path='versionGetTest' element={<VersionGetTest></VersionGetTest>}></Route>
                            <Route path='mobax' element={<Mobax></Mobax>}></Route>
                            <Route path="mobax/context" element={
                                <OtherStoreContext.Provider value={new OtherStore()}>
                                    <MobaxContext></MobaxContext>
                                </OtherStoreContext.Provider>
                            }></Route>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </React.Fragment>
    );
};

export default testRouter;