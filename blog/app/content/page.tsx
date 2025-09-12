import React from 'react'
import fs from 'fs'
import path from 'path'
import { text } from 'node:stream/consumers'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeClassNames from 'rehype-class-names'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeHighlightCodeBlocks from '@mapbox/rehype-highlight-code-block'
import '@/components/tiptap-templates/simple/simple-editor.scss'
import '@/components/tiptap-node/heading-node/heading-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss'
import '@/components/tiptap-node/code-block-light-node/code-block-light-node.scss'
import './customize-style.less'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', js)
hljs.registerLanguage('js', js)
hljs.registerLanguage('typescript', ts)
hljs.registerLanguage('ts', ts)
hljs.registerLanguage('xml', html)
hljs.registerLanguage('html', html)
hljs.registerLanguage('bash', bash)
const Content = async () => {
    const filePath = path.resolve(process.cwd(), 'app', 'content', 'test.md')
    const rs = fs.createReadStream(filePath)
    const md = await text(rs)
    const rehypeClassNamesOptions = {
        h2: 'one two'
    }
    const schema = {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          mark: [
            // 允许 style（注意安全，尽量限制）
            'style',
            // 允许 data-* 中的 data-color
            ['data-color', 'string']
          ]
        }
      }
    return (
        <div className="tiptap ProseMirror simple-editor customize-style">
            <Markdown
                rehypePlugins={
                    [ 
                        rehypeRaw,
                        [
                            rehypeSanitize, 
                            schema
                        ],
                        [
                            rehypeHighlightCodeBlocks,
                            {
                                highlight: (code, rawLang) => {
                                    const lang = (rawLang || '').split(/\s+/)[0].toLowerCase()
                                    console.log("我是代码块信息", rawLang, !lang, !hljs.getLanguage(lang))
                                    if (!lang || !hljs.getLanguage(lang)) {
                                        return hljs.highlightAuto(code).value
                                    }
                                    return hljs.highlight(code, { language: lang }).value
                                },
                            }
                        ],
                        [
                            rehypeClassNames , 
                            rehypeClassNamesOptions
                        ],
                    ]
                }
            >
                {md}
            </Markdown>
        </div>
    )
}

export default Content