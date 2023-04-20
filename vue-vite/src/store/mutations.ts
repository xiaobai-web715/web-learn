import {SET_ROUTE_TREE, SET_AUTH, SET_USER, SET_ID} from '@/store/actionsTypes';
import { IRoute } from '@/typings/sever';
import { IState } from './state';
export default {
    [SET_ROUTE_TREE] (state: IState, routeTree: IRoute[]) {
        state.routeTree = routeTree;
    },
    [SET_AUTH] (state: IState, token: string) {
        state.token = token;
    },
    [SET_USER] (state: IState, user: string) {
        console.log('第二不通过action携带的信息更新store仓库');
        state.user = user;
    },
    [SET_ID] (state: IState, id: string) {
        state.id = id;
    }
};