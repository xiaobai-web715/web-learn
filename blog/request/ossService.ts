import { get, Response } from './index'

declare global {
    interface Window {
        OSS: new (options: any) => any
    }
}
export interface OssConfig {
    accessKeyId: string,
    accessKeySecret: string,
    expiration: string, // 过期时间
    securityToken: string, // SSToken
}

export interface OssFileInfo {
    file: File,
    options: OssConfig,
}

export interface OssResponseInfo {
    name: string,
    url: string,
    data: object
}

export const uploadFileToOSS = async <T extends OssFileInfo>({file, options}: T): Promise<Response<OssResponseInfo>> => {
    if (!window.OSS) {
        return {
            code: 500,
            data: null,
            message: 'oss-sdk加载失败'
        }
    } else {
        const client = new window.OSS({
            region: 'oss-cn-beijing', // OSS的region
            accessKeyId: options.accessKeyId,
            accessKeySecret: options.accessKeySecret,
            stsToken: options.securityToken,
            bucket: 'lxh-doc-test',
        })
        const response = await client.put(file.name, file)
        if (response.res.status === 200) {
            return {
                code: 200,
                data: {
                    name: response.name,
                    url: response.url,
                    data: response.data
                },
                message: ''
            }
        } else {
            return {
                code: 500,
                data: null,
                message: '上传失败'
            }
        }
    }
}

export const getOssSSToken = () => {
    return get<OssConfig>('/api/getConfig/getSTSToken')
}