import React from 'react';
import { Upload, UploadFile} from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { getOssSSToken, uploadFileToOSS, OssFileInfo, OssConfig, OssResponseInfo } from "@/request/ossService"
import useRequest from '@/hooks/use-request';
import DefaultUploadContent from './defaultUploadContent';
import AntdThemeChange from '@/components/high-level/antd-theme';
import type { GetProp, UploadProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface IProps {
    onChange: (imageAddress: string) => void
}
const UploadIndex = ({ onChange }: IProps) => {
    const [state, request] = useRequest<void, OssConfig>(getOssSSToken);
    const [uploadState, uploadRequest] = useRequest<OssFileInfo, OssResponseInfo>(uploadFileToOSS);
    const customRequest = async (options: UploadRequestOption) => {
        const { file, onSuccess, onError } = options;
        request().then(res => {
            if (res.code === 200 && res.data) {
                return uploadRequest({
                    file,
                    options: res.data
                }).then(response => {
                    if (response.code === 200 && response.data) {
                        if (onSuccess) {
                            onSuccess(response.data)
                        }
                    } else {
                        throw new Error(res.message || '上传失败')
                    }
                })
            } else {
                throw new Error(res.message || '上传失败')
            }
        }).catch(e => {
            if (onError) {
                onError(e)
            }
        })
    }
    const uploadFileChange = ({ file }: { file: UploadFile }) => {
        if (onChange && file.response) {
            onChange(file.response.url)
        }
    }
    return (
        <Upload
            customRequest={customRequest}
            onChange={uploadFileChange}
        >
            <DefaultUploadContent loading={state.loading || uploadState.loading}></DefaultUploadContent>
        </Upload>
    )
}

export default AntdThemeChange(UploadIndex);