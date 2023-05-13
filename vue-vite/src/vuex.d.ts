import { Store } from "vuex";
import {IState} from '@/store/state';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<IState>
    }
}