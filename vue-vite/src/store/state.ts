import { IRoute } from "@/typings/sever";
const token = sessionStorage.getItem('token');
export interface IState {
    uid: number,
    token: boolean,
    routeTree: IRoute[],
}
export default {
    uid:3,
    token: token ? token : false,
    routeTree:[],
};