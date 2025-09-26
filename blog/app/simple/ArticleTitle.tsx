import { Input } from 'antd';
import { Fragment, forwardRef, useImperativeHandle, useState } from 'react';
import AntdThemeChange from '@/components/high-level/antd-theme';

export type ArticleTitleRef = { getValue: () => string | undefined };
const ArticleTitle = forwardRef<ArticleTitleRef>((_, ref) => {
    const [title, setTitle] = useState<string>();
    useImperativeHandle(
        ref,
        () => ({
            getValue: () => title,
        }),
        [title],
    );
    return (
        <Fragment>
            <div className="grid grid-cols-[max-content_1fr] grid-rows-[2rem] gap-[10px] pl-[1rem] pr-[1rem]">
                <div className="flex items-center justify-end">文章标题:</div>
                <Input
                    value={title}
                    placeholder="请输入文章标题"
                    onChange={(e) => {
                        console.log('我是文章的标题', e.target.value);
                        setTitle(e.target.value);
                    }}
                />
            </div>
        </Fragment>
    );
});

export default AntdThemeChange(ArticleTitle);
