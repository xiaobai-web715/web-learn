//我们将创建一个带有前面定义的请求处理程序的服务器实例
import {setupServer} from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);