'use client';
import Link from 'next/link';
import { FC } from 'react';
import { IDoc } from './type';

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
                    <div className="doc_title">{info.title}</div>
                    <div className="doc_content"></div>
                    <div className="doc_intro">{info.title}</div>
                </Link>
            </div>
        );
    }
};

export default DocsItem;
