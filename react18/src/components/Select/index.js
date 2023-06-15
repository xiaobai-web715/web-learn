import React , {useState, useEffect , useRef} from 'react';
const Css = require('./index.scss');
import PropTypes from 'prop-types';
//还未实现的(
    // 1.select的样式要修改(√)
    // 2.遮罩产生的时候如何禁止掉其可以触发一下穿透的事件(像window下的滚动条滚动,touchmove事件等等)
    // 3.还可以添加一个字段(表示用户需不需要将选择部分在下拉框中也呈现出来，然后给与对应的高亮提示)
    // 4.还有select的滚动条如何去掉(以及其滚动到底部的时候如何也禁止掉其可以继续去滚动window下的滚动条的操作)(√)
// )
const Select = (props) => {
    const {options , onChange , placeholder, root} = props;
    const [show , setShow] = useState(false);
    const [value , setValue] = useState(placeholder ? placeholder : '请选择你想选择的选项');
    const [reverse , setReverse] = useState(false);
    const titleDOM = useRef();//用来获取当前UI组件的定位
    const selectDOM = useRef();
    const selectContent = useRef();
    const mask = useRef();
    const selectShow = () => {
        mask.current.style.height = `${document.getElementById(root).offsetHeight}px`;
        setShow(true);
    };
    const selectDisappear = () => {
        setShow(false);
    };
    const selectValue = (e) => {
        setShow(false);
        setValue(e.target.innerHTML);//将内容写入title里面
        onChange(e.target.innerHTML);
    };
    const maskDisapper = () => {
        setShow(false);
    };
    //获取当前DOM的一个offset位置
    const offsetLeft = (dom) => {
        let sum = dom.offsetLeft;
        if(dom.offsetParent){
            sum += offsetLeft(dom.offsetParent);
        }
        return sum;
    };
    const offsetTop = (dom) => {
        let sum = dom.offsetTop;
        if(dom.offsetParent){
            sum += offsetLeft(dom.offsetParent);
        }
        return sum;
    };
    //获取title(DOM)相对于视口的定位信息,select(DOM)根据title获取的值进行定位
    //为啥要传入一个e(因为监听滚动的时候默认传入的第一个值就是e, 这里兼容一下)
    const offsetDOM = (e , title = titleDOM , select = selectDOM , content = selectContent) => {
        let dom = title.current;
        let left = offsetLeft(dom);
        let top = offsetTop(dom);
        // dom.offsetHeight(返回元素实际的大小，包括边框、内容、内边距和滚动条)
        let height = title.current.offsetHeight;
        //bottom是相对于视口来说的
        let bottom = document.documentElement.clientHeight - top - height;
        //dom.clientHeight(元素可视区域padding和内容的高度和,如果有滚动条则会减去滚动条)
        let selectNum = props.num || 6;
        let selectHeight = selectNum * height;
        if(Math.floor(bottom / height) > selectNum){
            setReverse(false);
            select.current.style = `top : ${top}px ; left : ${left}px ;`;
        }else{
            setReverse(true);
            select.current.style = `bottom : ${bottom}px ; left : ${left}px ;`;
            content.current.scrollTop = content.current.scrollHeight - selectHeight;
            //dom.scrollHeight(元素的整体高度包括溢出的部分(不包括外边距)，同样有滚动条也会减去滚动条,clientHeight可以说是它的一部分)
        }
        content.current.style = `max-height:${selectHeight}px`;
    };
    useEffect(() => {
        offsetDOM();
        window.addEventListener('scroll' , offsetDOM);
        window.addEventListener('resize' , offsetDOM);
        return () => {
            window.removeEventListener('scroll' , offsetDOM);
            window.removeEventListener('resize' , offsetDOM);
        };
    } , []);
    return (
        <>
            <div ref={mask} className={`${Css['mask']} ${show ? Css['show'] : ''}`} onClick={maskDisapper}></div>
            <div className={Css['box']}>
                <div className={Css['title']} onClick={selectShow} ref={titleDOM}>{value}</div>
                <div className={`${Css['select']} ${show ? Css['show'] : ''} ${reverse ? Css['borderBottom'] : Css['borderTop']}`} ref={selectDOM}>
                    {!reverse ? <div className={`${Css['value']}`} onClick={selectDisappear}>{value}</div> : ''}
                    <div className={Css['content']} ref={selectContent}>
                        {
                            (reverse ? [...options].reverse() : options).map((item) => {
                                if(item !== value){
                                    return(
                                        <div className={`${Css['item']} ${reverse ? Css['borderBottom'] : Css['borderTop']}`} onClick={selectValue} key={item}>{item}</div>
                                    );
                                }
                            })
                        }
                    </div>
                    {reverse ? <div className={`${Css['value']}`} onClick={selectDisappear}>{value}</div> : ''}
                </div>
            </div>
        </>
    );
};

Select.propTypes = {
    num: PropTypes.any,
    root: PropTypes.any,
    placeholder: PropTypes.any,
    onChange: PropTypes.any,
    options: PropTypes.any,
};

export default Select;