import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [fileURL, setFileURL] = useState('请先选择你要上传的文件');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        document.forms['formJSON'].addEventListener('submit', (e) => {
            // console.log(document.forms[formJSON]);
            e.preventDefault();
            // axios中如何配置请求头(https://blog.csdn.net/suyalei4/article/details/102940611?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522166055226316781432952095%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=166055226316781432952095&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-1-102940611-null-null.142^v40^pc_rank_34_2,185^v2^control&utm_term=axios%E5%A6%82%E4%BD%95%E8%AE%BE%E7%BD%AEcontent-type&spm=1018.2226.3001.4187)
            let formData = null;
            let headers = {};
            if (Math.random() > 0.5) {
                formData = new FormData(); 
                for (let element of e.target.elements) {
                    if (element.value) {
                        formData.append(element.name, element.value);
                    }
                }
            } else {
                console.log('content-type为application/json');
                let formValue = {};
                for ( let element of e.target.elements) {
                    if (element.value) {
                        formValue[element.name] = element.value;
                    }
                }
                formData = JSON.stringify(formValue);
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            axios({
                headers,
                method: 'POST',
                url: '/api/newFormData',
                data: formData, //通过FormData()作为参数进行axios请求content-type: multipart/form-data
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
    const submit = (e) => {
        // 提交表单时没有指明编码方式,那默认就是application/x-www-form-urlencoded
        const node = document.createElement('iframe');
        // node.style.display = 'none';
        node.name = 'myIframe';
        document.body.appendChild(node);
        setTimeout(() => {
            document.body.removeChild(node);
        }, 1000);
    };
    return (
        <React.Fragment>
            <form name='formJSON'>
                <input name='file' type='file' onChange={getFileName} accept='.csv,.txt,.jpg'></input>
                <input name='url' placeholder={fileURL}></input>
                <input type='submit'></input>
            </form>
            <form method='post' action='/api/newFormData' role='form' target='myIframe' encType='multipart/form-data'>
                {/* encType用来设置form表单请求的content-type, 必须设置成multipart/form-data属性才能够实现文件的上传 */}
                {/* 通过target链接到iframe身上防止跳转页面 */}
                {/* form表单里面元素的name属性是必须的,作为表单提交请求时,请求参数的key */}
                <label>
                    用户名:
                    <input type='text' value={name} name='userName' onChange={(e) => {setName(e.target.value);}}></input>
                </label><br/>
                <label>
                    密码:
                    <input type='password' value={password} name='userPassword' onChange={(e) => {setPassword(e.target.value);}}></input>
                </label><br/>
                <label>
                    选择文件:
                    <input type='file' accept='.csv' name='file'></input>
                </label>
                <input type='submit' onClick={submit}></input>
            </form>
        </React.Fragment>
    );
};
export default UploadFile;