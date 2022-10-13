import {SET_ROUTE_TREE, SET_AUTH} from '@/store/actionsTypes';
import { IRoute } from '@/typings/sever';
import { IState } from './state';
export default {
    [SET_ROUTE_TREE] (state: IState, routeTree: IRoute[]) {
        state.routeTree = routeTree;
    },
    [SET_AUTH] (state: IState, token: boolean) {
        state.token = token;
    }
};