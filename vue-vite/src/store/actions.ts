import { SET_AUTH, SET_ID, SET_ROUTE_TREE, SET_USER } from './actionsTypes';
import { IState } from './state';
import { Commit } from 'vuex';
import { IRoute } from '@/typings/sever';
import { formatRouteTree } from '@/utils/index';
import axios from '@/http/index';
export default {
    async [SET_ROUTE_TREE]({ commit, state }: { commit: Commit, state: IState }) {
        const getUserRouteList = () => {
            // return request<null>({
            //     url: '/vueVite/user_router_list', 
            //     method: 'post' ,
            // }).then(res => res.data);
            /**
             * 将node的数据迁移到数据库当中
             */
            return axios({
                method: 'post',
                url: '/admin/router/getUserRouter',
                params: {}
            }).then(res => res.data);
        };
        const routeList = await getUserRouteList() as unknown as IRoute[];
        console.log('routeList', routeList);
        const routeTree = formatRouteTree(routeList); //将routeList变成routeTree;
        console.log('routeTree', routeTree);
        // commit(SET_AUTH, true);
        return Promise.resolve(routeTree);
    },
    async [SET_AUTH]({ commit, state }: { commit: Commit, state: IState }, playload: { token: string }) {
        if (playload.token) {
            commit(SET_AUTH, playload.token);
        }
    },
    [SET_USER]({commit, state}: { commit: Commit, state: IState }, playload: { user: string }) {
        console.log('第一步通过action发起dispatch');
        if (playload.user) {
            commit(SET_USER, playload.user);
        }
    },
    [SET_ID]({commit, state}: { commit: Commit, state: IState }, playload: { id: string }) {
        if (playload.id) {
            commit(SET_ID, playload.id);
        }
    }
};