import React from 'react'
import fs from 'fs'
import path from 'path'
import { text } from 'node:stream/consumers'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
const Content = async () => {
    const filePath = path.resolve(process.cwd(), 'app', 'content', 'test.md')
    const rs = fs.createReadStream(filePath)
    const md = await text(rs)
    return (
        <Markdown>
            {md}
        </Markdown>
    )
}

export default Content