import { IRoute } from "@/typings/sever";
export interface IState {
    uid: number,
    token: boolean,
    routeTree: IRoute[],
}
export default {
    uid:3,
    token: false,
    routeTree:[],
};