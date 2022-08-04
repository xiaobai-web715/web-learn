import React, { useEffect, useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addValue } from '../../reducer/todoListReducer'
const Css = require('./index.scss')
// import url from '../../image/components/TouchByMiatask/二维码.jpeg' //引入jpeg方式的图片不成功
const Index = () => {
    // const url = require('../../image/components/TouchByMiatask/二维码.jpeg')
    const dispatch = useDispatch();
    const state = useSelector((state) => state.todoList);
    console.log('state', state);
    let preventDefaultFn = useCallback((e) => {e.preventDefault();}, [])
    useEffect(() => {
        document.addEventListener('contextmenu', preventDefaultFn)
        return(
            () => {
                document.removeEventListener('contextmenu', preventDefaultFn);
            }
        )
    }, [])
    const add = () => {
        dispatch(addValue(10));
    }
    return (
        <div className={Css['page']}>
            <img src={'https://pic.90sheji.com/design/01/24/80/47/5906e618b27fb.png!/fw/280/quality/90/unsharp/true/compress/true/canvas/280x297a0a0/cvscolor/FFFFFFFF'}></img>
            <button className={Css['button']} onClick={add}>+</button>
        </div>
    )
}

export default Index