import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/index";
import GamesEntry from "./entry/index";
const RoutePage = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/gameEntry" element={<GamesEntry />}></Route>
            </Routes>
        </HashRouter>
    );
};
export default RoutePage;
