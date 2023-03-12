import React, {useEffect, useState, useRef} from 'react';
import Css from './index.scss';

const chooseModel = (props: propsI) => {
    const valueHeight = useRef<number>();
    const [domList, setDomList] = useState<{key: string, node: HTMLDivElement | null}[]>([]);
    useEffect(() => {
        const infos: {key: string, node: HTMLDivElement | null}[] = [];
        props.columns.forEach((item) => {
            infos.push({key: item.key, node: null});
        });
        console.log('infos', infos);
        setDomList([...infos]);
    }, []);
    const chooseComplete = () => {
        console.log('我点击了确定，开始获取滚动轴滚动的距离');
        const domScrollHeight:{key: string, height: number | string}[] = [];
        domList.forEach(({key, node}) => {
            const scrollMove = node?.scrollTop;
            console.log('scrollMove', scrollMove);
            if (scrollMove) {
                domScrollHeight.push({key, height: scrollMove});
            }
            console.log('我是选项的大小', valueHeight);
            console.log('domScrollHeight', domScrollHeight);
        });
    };
    return (
        <div className={Css['scrollDate']}>
            <div className={Css['mask']}>
            </div>
            <div className={Css["selectMiddle"]}>
                <div className={Css['selectMiddleContent']}>
                    <div className={Css['selectMiddleHeader']}>
                        <div className={Css['cancel']}>取消</div>
                        <div className={Css['sure']} onClick={chooseComplete}>确定</div>
                    </div>
                    <div className={Css['selectMiddleWrapper']}>
                        <div className={Css['selectWrapper']}>
                            {
                                props.columns && props.columns.map((item, index) => {
                                    return (
                                        <div key={index} className={Css['selectMiddleUnits']} ref={(node) => {
                                            if (node && domList.length > 0) {
                                                console.log('我打印的是什么', domList);
                                                const info:{key: string, node: HTMLDivElement | null} | undefined = domList.find(dom => dom.key == item.key);
                                                if (info) {
                                                    info.node = node;
                                                }
                                            }
                                        }}>
                                            <div className={Css['untils']}>
                                                {
                                                    item.values && new Array(2).fill(undefined).concat(item.values).map((value: objectI, valueIndex: number) => {
                                                        return (
                                                            <div className={Css['valueWrapper']} key={valueIndex} ref={(node) => {
                                                                if (node) {
                                                                    valueHeight.current = node.clientHeight;
                                                                }
                                                            }}>
                                                                {value?.label || ''}
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default chooseModel;