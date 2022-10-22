import {SET_AUTH, SET_ROUTE_TREE} from './actionsTypes';
import { IState } from './state';
import {Commit} from 'vuex';
import { getUserRouteList } from '@/sever/index';
import { IRoute } from '@/typings/sever';
import { formatRouteTree } from '@/utils/index';
export default {
    async [SET_ROUTE_TREE] ({commit, state}: {commit:Commit, state:IState}) {
        const routeList = await getUserRouteList() as unknown as IRoute[];
        const routeTree = formatRouteTree(routeList); //将routeList变成routeTree;
        // commit(SET_AUTH, true);
        return Promise.resolve(routeTree);
    },
    async [SET_AUTH] ({commit, state}: {commit:Commit, state:IState}, playload: {token: Boolean}){
        if (playload.token) {
            commit(SET_AUTH, playload.token);
        }
    }
};