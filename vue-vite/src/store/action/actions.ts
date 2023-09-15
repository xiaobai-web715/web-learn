import { SET_AUTH, SET_ID, SET_ROUTE_TREE, SET_USER } from '../actionsTypes';
import { Commit } from 'vuex';
import { formatRouteTree } from '@/utils/structureTree';
import axios from '@/http/index';
export default {
    async [SET_ROUTE_TREE]({ commit, state }: { commit: Commit, state: IState }) {
        const getUserRouteList = () => {
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
        const routeTree = formatRouteTree(routeList); //将routeList变成routeTree;
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