'use client';
import { message } from 'antd';
import React, { useRef } from 'react';
import SaveArticle from './SaveArticle';
import ArticleTitle, { ArticleTitleRef } from './ArticleTitle';
import { setDoc } from '@/request/docService';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import type { SimpleEditorRef } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
    const [messageApi, contextHolder] = message.useMessage();
    const editorRef = useRef<SimpleEditorRef>(null);
    const titleRef = useRef<ArticleTitleRef>(null);
    const saveArticle = () => {
        const title = titleRef.current?.getValue();
        const editor = editorRef.current?.getEditor();
        if (!title) {
            return messageApi.error('请输入文章标题');
        }
        // @ts-expect-error 此属性为添加额外库后增加的属性
        const output = editor?.storage?.markdown?.getMarkdown();
        setDoc({
            content: output,
            userId: '11',
            title,
        }).then((res) => {
            console.log('我是响应的值', res);
            if (res.code === 200) {
                messageApi.success('保存成功');
            } else {
                messageApi.error(res.message || '保存失败');
            }
        });
    };
    return (
        <React.Fragment>
            {contextHolder}
            <ArticleTitle ref={titleRef}></ArticleTitle>
            <SimpleEditor ref={editorRef} />
            <SaveArticle saveArticle={saveArticle} />
        </React.Fragment>
    );
}
