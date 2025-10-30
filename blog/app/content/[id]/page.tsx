import React from 'react';
import { getDocContent } from '@/request/docService';
import { MarkdownAsync } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeClassNames from 'rehype-class-names';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeShiki from '@shikijs/rehype';
import '@/components/tiptap-templates/simple/simple-editor.scss';
import '@/components/tiptap-node/heading-node/heading-node.scss';
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss';
import '@/components/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/components/tiptap-node/code-block-light-node/code-block-light-node.scss';
import './customize-style.less';

interface IDocContent {
    id: number;
    content: string;
}
const Content = async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;
    const res = await getDocContent<IDocContent>(id);
    const mdInfo = res.data;
    // const filePath = path.resolve(process.cwd(), 'app', 'content', 'test.md');
    // const rs = fs.createReadStream(filePath);
    // const md = await text(rs);
    const rehypeClassNamesOptions = {
        h2: 'one two',
    };
    const schema = {
        ...defaultSchema,
        attributes: {
            ...defaultSchema.attributes,
            mark: [
                // 允许 style（注意安全，尽量限制）
                'style',
                // 允许 data-* 中的 data-color
                ['data-color', 'string'],
            ],
        },
    };
    return (
        <div className="tiptap ProseMirror simple-editor customize-style no-first-p-not-margin-top">
            <MarkdownAsync
                rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, schema],
                    [rehypeClassNames, rehypeClassNamesOptions],
                    [
                        rehypeShiki,
                        {
                            themes: {
                                light: 'andromeeda',
                                dark: 'vitesse-dark',
                            },
                        },
                    ],
                ]}
            >
                {mdInfo?.content || ''}
            </MarkdownAsync>
        </div>
    );
};

export default Content;
