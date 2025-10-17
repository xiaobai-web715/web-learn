'use client';
import Link from 'next/link';
import { FC } from 'react';
import { IDoc } from './type';
import dayjs from 'dayjs';

type DocsItemProps = {
    info: IDoc;
};
const DocsItem: FC<DocsItemProps> = (props) => {
    const { info } = props;
    if (!info) {
        return null;
    } else {
        return (
            <div className="intro-gradient">
                <Link href={`/content/${info.id}`}>
                    <div className="doc_title">{'标题：'}{info.title}</div>
                    <div className="doc_content mt-[0.5rem]">
                        <div className="doc_baseInfo text-[0.8rem] text-[#999]">
                            <div>{`作者：${''}`}</div>
                            <div>{`创建时间：${dayjs(info.createTime).format('YYYY-MM-DD HH:mm:ss')}`}</div>
                            <div>{`更新时间：${dayjs(info.updateTime).format('YYYY-MM-DD HH:mm:ss')}`}</div>
                            <div>{`更新人：${''}`}</div>
                        </div>
                    </div>
                    <div className="doc_intro"></div>
                </Link>
            </div>
        );
    }
};

export default DocsItem;
