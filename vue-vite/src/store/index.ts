import { createStore } from "vuex";
import state from '@/store/state/index';
import actions from '@/store/action/index';
import mutations from '@/store/mutations/index';
export default createStore<IState>({
    state,
    actions,
    mutations,
});