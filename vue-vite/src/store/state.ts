import { IRoute } from "@/typings/sever";
const token = sessionStorage.getItem('token');
export interface IState {
    token: string,
    user: string,
    id: string,
    routeTree: IRoute[],
}
export default {
    token: '',
    user: '',
    id: '',
    routeTree:[],
};