import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [fileURL, setFileURL] = useState('请先选择你要上传的文件');
    useEffect(() => {
        document.forms[0].addEventListener('submit', (e) => {
            e.preventDefault();
            //new FormData()可以将表单进行序列化操作(但是默认传参是FormData的情况下,content-Type是multipart/form-data)
            // axios中如何配置请求头(https://blog.csdn.net/suyalei4/article/details/102940611?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166055226316781432952095%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166055226316781432952095&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-102940611-null-null.142^v40^pc_rank_34_2,185^v2^control&utm_term=axios%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AEcontent-type&spm=1018.2226.3001.4187)
            axios({
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded'
                // },
                method: 'POST',
                url: '/api/newFormData',
                data: data,
            }).then(res => {
                console.log('res', res);
            });
        });
    }, []);
    const getFileName = async (e) => {
        console.log('input-file的change事件触发的', e);
        let files = e.target.files;
        //这样生成的URL并未将文件数据先读取到js中,生成的url只是指向内存中地址的一个字符串
        let url = window.URL.createObjectURL(files[0]);
        // console.log('url', url);
        setFileURL(url);

        //new FileReader()有几个读取数据的api,是异步的方式(会有几个事件progress,error,load => 代表还有更多数据,发生了错误,读取完成)
        let render = new FileReader();
        render.readAsDataURL(files[0]);
        render.onload = function (){
            console.log('render.result', render.result);
        };
    };
    return (
        <React.Fragment>
            <form>
                <input name='file' type='file' onChange={getFileName} accept='.csv,.txt,.jpg'></input>
                <input name='url' placeholder={fileURL}></input>
                <input name='submit' type='submit'></input>
            </form>
        </React.Fragment>
    );
};
export default UploadFile;