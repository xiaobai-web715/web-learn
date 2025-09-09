'use client';
import React, { useRef } from 'react';
import SaveArticle from './SaveArticle';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import type { SimpleEditorRef } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
    const editorRef = useRef<SimpleEditorRef>(null);
    const saveArticle = () => {
        const editor = editorRef.current?.getEditor();
        // @ts-expect-error 此属性为添加额外库后增加的属性
        const output = editor?.storage?.markdown?.getMarkdown()
    };
    return (
        <React.Fragment>
            <SimpleEditor ref={editorRef} />
            <SaveArticle saveArticle={saveArticle} />
        </React.Fragment>
    );
}
