import React, {useState} from 'react';
import Css from './upFile.scss';
import axios from 'axios';

const UpFile = () => {
    //借助input与a标签实现excel文件的模板的下载与上传，并在node层实现对上传文件的内容的获取
    const [file, setFile] = useState(null);
    const [warning, setWarning] = useState(false);
    const downFile = () => {
        let iframe = document.createElement('iframe');
        iframe.setAttribute('src', '/api/static/excel/module.xlsx');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        setTimeout(() => {
            document.body.removeChild(iframe);
        }, 1000);
    };
    const chooseFile = (e) => {
        if(e.target.files[0]) {
            setFile(e.target.files[0]);
            setWarning(false);
        }
    };
    const submit = () => {
        let result = file != null;
        if (result) {
            let formData = new FormData();
            formData.append('file', file);
            axios.post('/api/upFile/submit/xlsx', formData , {responseType: 'arraybuffer'}).then((res) => {
            // axios.post('/api/upFile/submit/xlsx', formData ).then((res) => {
                // if (res.status === 200) {
                //     let buffer = new Blob([res.data], {type: 'application/vnd.ms-excel'})  //type属性应该目的只是告诉该以什么形式去下载
                //     console.log('buffer', buffer);
                //     let url = window.URL.createObjectURL(buffer);
                //     let link = document.createElement('a');
                //     link.style.display = 'none';
                //     link.href = url;
                //     link.setAttribute(
                //         "download",
                //         // res.headers['content-disposition'].split('=')[1]
                //         "module.xlsx",
                //         // "module.zip",
                //     );
                //     document.body.appendChild(link);
                //     link.click();
                //     document.body.removeChild(link);
                // }
                if (res.status === 200) {
                    console.log('res', res); //buffer与arrayBuffer的区别
                    try {
                        let enc = new TextDecoder('utf-8');
                        let result = JSON.parse(enc.decode(new Uint8Array(res.data))); //报错说明是buffer数据
                        console.log('result', result);
                        if (result.status) {
                            alert('result', result);
                        }
                    }catch(err){
                        const content = res.data;
                        const blob = new Blob([content]);
                        let url = window.URL.createObjectURL(blob);
                        let link = document.createElement('a');
                        link.style.display = 'none';
                        link.href = url;
                        console.log('file', res.headers['content-disposition'].split('=')[1], blob, url);
                        link.setAttribute(
                            "download",
                            res.headers['content-disposition'].split('=')[1],
                            // "module.xlsx",
                            // "module.zip",
                        );
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                } 
            });
        } else {
            setWarning(true);
            return null;
        }
    };
    return (
        <React.Fragment>
            <div className={Css['download']} onClick={downFile}>下载模板</div>
            <div className={Css['box']}>
                <button>
                    选择文件
                    <span className={warning? Css['active'] : ''}>{warning? '请选择要上传的文件': (file != null ? file.name: '')}</span>
                </button>
                <input className={Css['file']} type='file' accept='.xlsx' onChange={chooseFile}/>
            </div>
            <button className={Css['submit']} onClick={submit}>上传</button>
        </React.Fragment>
    );
};

export default UpFile;