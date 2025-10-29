import React from 'react';
import { Upload } from 'antd';
import { getOssSSToken, uploadFileToOSS, OssFileInfo, OssConfig, OssResponseInfo } from "@/request/ossService"
import useRequest from '@/hooks/use-request';
import DefaultUploadContent from './defaultUploadContent';
import AntdThemeChange from '@/components/high-level/antd-theme';
import type { GetProp, UploadProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const UploadIndex = () => {
    const [state, request] = useRequest<void, OssConfig>(getOssSSToken);
    const [uploadState, uploadRequest] = useRequest<OssFileInfo, OssResponseInfo>(uploadFileToOSS);
    const beforeUpload = (file: FileType) => {
        return request().then(res => {
            if (res.code === 200 && res.data) {
                uploadRequest({
                    file,
                    options: res.data
                }).then(response => {
                    console.log("我是上传文件的信息", response);
                })
            }
        })
    }
    return (
        <Upload
            beforeUpload={beforeUpload}
        >
            <DefaultUploadContent loading={state.loading || uploadState.loading}></DefaultUploadContent>
        </Upload>
    )
}

export default AntdThemeChange(UploadIndex);