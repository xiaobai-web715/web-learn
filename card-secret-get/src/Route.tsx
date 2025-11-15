import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/index";
import GamesEntry from "./entry/index";
import Introduction from "./introduction/index";
import Receive from "./receive/index";
const RoutePage = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/gameEntry" element={<GamesEntry />}></Route>
                <Route path="/introduction" element={<Introduction />}></Route>
                <Route path="/receive" element={<Receive />}></Route>
                <Route path="*" element={<HomePage />}></Route>
            </Routes>
        </HashRouter>
    );
};
export default RoutePage;
