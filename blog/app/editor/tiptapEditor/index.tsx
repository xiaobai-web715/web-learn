"use client"
import React from 'react'
import { TextStyleKit } from '@tiptap/extension-text-style'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
const EditorPage = () => {
    const editor = useEditor({
        extensions: [
            TextStyleKit, 
            StarterKit
        ],
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    })
    return (
        <React.Fragment>
            <EditorContent editor={editor} />
        </React.Fragment>
    )
}

export default EditorPage