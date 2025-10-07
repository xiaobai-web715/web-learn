'use client';
import { message } from 'antd';
import React, { useRef, useEffect, useReducer } from 'react';
import SaveArticle from './SaveArticle';
import ArticleTitle, { ArticleTitleRef } from './ArticleTitle';
import { setDoc } from '@/request/docService';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import type { SimpleEditorRef } from '@/components/tiptap-templates/simple/simple-editor';
import { useParams } from 'next/navigation';
interface IDocInfo {
    title: string;
    id: number | null;
    content: string;
}
type ActionType = 'update';
interface IAction {
    type: ActionType;
    data: IDocInfo;
}
export default function Page() {
    const params = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [state, dispatch] = useReducer<IDocInfo, [IAction]>(
        (state, action) => {
            if (action.type === 'update') {
                return {
                    ...state,
                    ...action.data,
                };
            } else {
                return state;
            }
        },
        {
            title: '',
            id: null,
            content: '',
        },
    );
    const editorRef = useRef<SimpleEditorRef>(null);
    const titleRef = useRef<ArticleTitleRef>(null);
    useEffect(() => {
        if (params.id) {
        }
    }, []);
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
            id: state.id,
        }).then((res) => {
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
            <ArticleTitle ref={titleRef} title={state.title}></ArticleTitle>
            <SimpleEditor ref={editorRef} content={state.content} />
            <SaveArticle saveArticle={saveArticle} />
        </React.Fragment>
    );
}
