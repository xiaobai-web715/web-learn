'use client';
import React, { useRef } from 'react';
import SaveArticle from './SaveArticle';
import { setDoc } from '@/request/docService';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import type { SimpleEditorRef } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
    const editorRef = useRef<SimpleEditorRef>(null);
    const saveArticle = () => {
        const editor = editorRef.current?.getEditor();
        // @ts-expect-error 此属性为添加额外库后增加的属性
        const output = editor?.storage?.markdown?.getMarkdown()
        console.log('output', output);
        setDoc({
            content: output,
            title: '文章测试第一篇',
            userId: '11',
        }).then(res => {
            console.log('res', res);
            if (res.code === 200) {
                alert('保存成功');
            } else {
                alert('保存失败');
            }
        })
    };
    return (
        <React.Fragment>
            <SimpleEditor ref={editorRef} />
            <SaveArticle saveArticle={saveArticle} />
        </React.Fragment>
    );
}
