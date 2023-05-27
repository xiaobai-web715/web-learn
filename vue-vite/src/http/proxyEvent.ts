import md5 from 'md5';
import EventEmitter from 'events';
import { AxiosRequestHeaders, AxiosRequestConfig} from 'axios'; 

interface taskInfoI {
    url: string, 
    method: string, 
    params?: any, 
    headers?: AxiosRequestHeaders
}
interface taskIdListsI {
    [key: string] : boolean
}

const eventQueue = new EventEmitter(); // 创建事件监听方式保证不同请求能够准确调用到对应的等待
const taskIdLists:taskIdListsI = {};
// 重复请求处理,测试高重复请求只请求一次
export default {
    proxy (task: () => any, taskInfo: AxiosRequestConfig): Promise<any> {
        // 对请求信息进行编译
        const taskId: string = md5(JSON.stringify(taskInfo));
        // console.log('String', taskId);
        return new Promise((resolve, reject) => {
            eventQueue.once(taskId, ({error, result}) => {
                // 多个重复的请求会创建相同的taskId并注册一个相同的等待事件
                if (error) reject(error);
                else resolve(result);
            });
            // 判断taskId有没有删除(没有删除说明taskId还存在, 事件还未被触发, 可以直接返回出去)
            if (taskIdLists[taskId]) return console.log('当前请求已经存在');
            taskIdLists[taskId] = true;
            task().then((result: Object) => {
                delete taskIdLists[taskId];
                eventQueue.emit(taskId, {error: null, result});
            }).catch((error: Object) => {
                delete taskIdLists[taskId];
                eventQueue.emit(taskId, {error});
            });
        });
    }
};