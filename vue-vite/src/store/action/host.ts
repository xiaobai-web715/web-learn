import { Commit } from 'vuex';
import {GET_IP} from '@/store/actionsTypes';
import axios from '@/http/index';
export default {
    async [GET_IP] (commit: Commit, state) {
        console.log('没有触发请求');
        // return axios({
        //     url: 'http://api.ipify.org?format=json',
        //     method: 'get'
        // }).then(res => {
        //     commit(GET_IP, res.data.ip);
        //     return res;
        // });
    }
};