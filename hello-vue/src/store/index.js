import {createStore} from 'vuex';
import firstStore from './firstStore/index'

const store = createStore({
    modules: {
        firstStore,
    }
})
export default store;