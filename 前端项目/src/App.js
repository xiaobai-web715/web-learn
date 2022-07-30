import React from 'react'
import { useNavigate , Routes , Route} from 'react-router-dom';
import SelectIndex from './view/SelectContent/index';
import TableIndex from './view/todoList/index'
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
                    <div onClick={goPage.bind(null, 'todoList')}>todoList</div>
                </div>
                <div className={Css['content']}>
                    <Routes>
                        <Route path="/select" element={<SelectIndex></SelectIndex>}></Route>
                        <Route path="/todoList" element={<TableIndex></TableIndex>}></Route>
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;