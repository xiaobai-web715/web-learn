import React from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "./index.less";
const DefaultUploadContent = ({ loading }: { loading: boolean}) => {
    return (
        <button className="default-upload-button" type="button">
            { loading ? <LoadingOutlined/> : <PlusOutlined/> }
            <div className="button-text">上传文件</div>
        </button>
    )
}

export default DefaultUploadContent;