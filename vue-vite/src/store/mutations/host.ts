import {GET_IP} from '@/store/actionsTypes';

export default {
    [GET_IP](state: IState, ip: string){
        state.ip = ip;
    }
};