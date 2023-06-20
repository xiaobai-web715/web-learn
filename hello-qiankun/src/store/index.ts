import {createStore} from 'vuex';
import firstStore from './firstStore/index';

const store = createStore<StateI>({
    modules: {
        firstStore,
    }
});
export default store;