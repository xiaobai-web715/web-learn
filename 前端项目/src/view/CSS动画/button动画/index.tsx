import React from 'react';
import Css from './index.scss';
import AdaptationTroll from '../js轮播动画/index';
import CssIndex from '../css轮播动画/index';
import { IList } from '../../../typings/utils';

const Index = () => {
    const list: Array<IList> = [
        {
            url: '3.jpg',
            title: '轮播图1',
        },
        {
            url: '26.jpg',
            title: '轮播图2',
        },
        {
            url: '33.jpg',
            title: '轮播图2',
        },
        {
            url: '54.jpg',
            title: '轮播图2',
        },
        {
            url: '88.jpg',
            title: '轮播图3',
        }
    ];
    return (
        <div>
            <CssIndex list={list}></CssIndex>
            <AdaptationTroll></AdaptationTroll>
            <div className={Css['position']}>
                <button className={Css['button']}>
                    <div className={Css['center']}>
                        <div>前往订阅</div>
                    </div>
                    <div className={Css['discount']}>
                        <div>低至5.5折!</div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Index;