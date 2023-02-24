import React, {useState, useEffect, useRef} from 'react';
const Css =  require('./index.scss');

const OperationPosition = () => {
    const operationDOM = useRef();
    const imageInfos = [
        'https://th.bing.com/th/id/OIP.RBxzEvmsW2ty4yZcaJ96wwHaEK?pid=ImgDet&rs=1', //宽度400
        'https://picnew8.photophoto.cn/20140522/gongqijundongmanfengjingtupian-08048596_1.jpg', //宽度600
        'https://th.bing.com/th/id/R.8e52820bd475459766749b57629a1504?rik=L1m4Ib7AwEUbCA&riu=http%3a%2f%2fpic.ntimg.cn%2f20130724%2f13028729_181700369118_2.jpg&ehk=vMMEVPLSk92fTIiRiSzvk%2bMl44%2bW2JtmglZPRD0%2fSzI%3d&risl=&pid=ImgRaw&r=0' //宽度小于375
    ];
    useEffect(() => {
        const timer = setInterval(() => {
            const index = Math.floor(Math.random() * 3);
            const image = new Image();
            image.src = imageInfos[index];
            image.onload = () => {
                const precent = image.height / image.width;
                operationDOM.current.style.paddingTop = (precent * 100) + '%';
                operationDOM.current.style.backgroundImage = `url(${imageInfos[index]})`;
            };
        }, 5000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div>
            <div className={Css['contioner']}>
                <div className={Css['operationImage']}>
                    <div className={Css['background']} ref={(node) => {
                        if (node) {
                            operationDOM.current = node;
                        }
                    }}></div>
                </div>
            </div>
        </div>
    );
};

export default OperationPosition;