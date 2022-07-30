import React from 'react'
import { useNavigate , Routes , Route} from 'react-router-dom';
// import './App.scss'
import SelectIndex from './view/SelectContent/index';
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
                </div>
                <div className={Css['content']}>
                    <Routes>
                        <Route path="/select" element={<SelectIndex></SelectIndex>}></Route>
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;