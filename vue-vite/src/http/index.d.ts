// vite中的.d.ts文件不能被ts文件自动识别出来(暂不清楚原因)
import { AxiosResponseHeaders} from 'axios';
interface taskInfoI {
    url: string, 
    method: string, 
    params?: any, 
    headers?: AxiosResponseHeaders
}