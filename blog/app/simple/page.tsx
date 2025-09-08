'use client';
import React, { useRef } from 'react';
import SaveArticle from './SaveArticle';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import type { SimpleEditorRef } from '@/components/tiptap-templates/simple/simple-editor';

export default function Page() {
    const editorRef = useRef<SimpleEditorRef>(null);
    const saveArticle = () => {
        const editor = editorRef.current?.getEditor();
        console.log('我是获取的editor', editor);
    };
    return (
        <React.Fragment>
            <SimpleEditor ref={editorRef} />
            <SaveArticle saveArticle={saveArticle} />
        </React.Fragment>
    );
}
