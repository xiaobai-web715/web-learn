import {SET_ROUTE_TREE, SET_AUTH, SET_USER, SET_ID} from '@/store/actionsTypes';
export default {
    [SET_ROUTE_TREE] (state: IState, routeTree: IRoute[]) {
        state.routeTree = routeTree;
    },
    [SET_AUTH] (state: IState, token: string) {
        state.token = token;
    },
    [SET_USER] (state: IState, user: string) {
        state.user = user;
    },
    [SET_ID] (state: IState, id: string) {
        state.id = id;
    }
};