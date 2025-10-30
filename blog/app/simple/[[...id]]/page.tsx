'use client';
import { message, Modal, Form, Input } from 'antd';
import React, { useRef, useEffect, useReducer } from 'react';
import MyUpload from '@/components/upload';
import SaveArticle from './SaveArticle';
import ArticleTitle, { ArticleTitleRef } from './ArticleTitle';
import { setDoc, getDocContentInWeb } from '@/request/docService';
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
type ISubmitInfo = Omit<IDocInfo, 'id' | 'content'> & { imageAddress: string, open: boolean }
interface ISubmitInfoAction {
    type: ActionType,
    data: Partial<ISubmitInfo>
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
    const [form] = Form.useForm();
    const [submitInfo, setSubmitInfoDispatch] = useReducer<ISubmitInfo, [ISubmitInfoAction]>((state, action) => {
        if (action.type === 'update') {
            return {
                ...state,
                ...action.data,
            };
        } else {
            return state;
        }
    }, {
        title: '',
        imageAddress: '',
        open: false
    })
    const editorRef = useRef<SimpleEditorRef>(null);
    const titleRef = useRef<ArticleTitleRef>(null);
    useEffect(() => {
        if (params.id) {
            if (Array.isArray(params.id)) {
                getDocContentInWeb<IDocInfo>(Number(params.id[0])).then((res) => {
                    if (res.code === 200 && res.data) {
                        dispatch({
                            type: 'update',
                            data: res.data,
                        })
                    } else {
                        messageApi.error(res.message || '获取失败')
                    }
                })
            }
        }
    }, []);
    const updateSubmitInfo = (data: Partial<ISubmitInfo>) => {
        setSubmitInfoDispatch({
            type: 'update',
            data
        })
    }
    const saveArticle = () => {
        const title = titleRef.current?.getValue();
        if (!title) {
            return messageApi.error('请输入文章标题');
        }
        updateSubmitInfo({ title, open: true})
    };
    const handleOk = () => {
        // 保存文章
        form.validateFields().then((result) => {
            if (result) {
                const editor = editorRef.current?.getEditor();
                // @ts-expect-error 此属性为添加额外库后增加的属性
                const output = editor?.storage?.markdown?.getMarkdown();
                setDoc({
                    content: output,
                    userId: '11',
                    title: submitInfo.title,
                    imageAddress: submitInfo.imageAddress,
                    id: state.id,
                }).then((res) => {
                    if (res.code === 200) {
                        messageApi.success('保存成功');
                        handleCancel()
                    } else {
                        messageApi.error(res.message || '保存失败');
                    }
                });
            }
        })
    }
    const handleCancel = () => {
        // 取消保存
        form.resetFields()
        updateSubmitInfo({ open: false, title: '', imageAddress: ''})
    }
    return (
        <React.Fragment>
            {contextHolder}
            <ArticleTitle ref={titleRef} title={state.title}></ArticleTitle>
            <SimpleEditor ref={editorRef} content={state.content} />
            <SaveArticle saveArticle={saveArticle} />
            <Modal
                title="基本信息"
                onOk={handleOk}
                cancelText="取消"
                okText="保存"
                onCancel={handleCancel}
                open={submitInfo.open}
            >
                <Form
                    form={form}
                    initialValues={{
                        title: submitInfo.title
                    }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input 
                            placeholder="请输入文章标题" 
                            disabled={ !!submitInfo.title } 
                            onChange={(e) => updateSubmitInfo({ title: e.target.value })}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="缩略图"
                        name="imageAddress"
                        rules={[{ required: true, message: '请上传文章缩略图' }]}
                    >
                        <MyUpload onChange={(imageAddress) => updateSubmitInfo({ imageAddress })}></MyUpload>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
}
