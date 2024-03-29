import withSomeData from "../Component.tsx"
import {defineComponent, reactive, watch} from "vue"
import SuperTable from "./SuperTable.ts"
const Index = defineComponent({
    props: {
        instance: {
            type: Object,
            default: () => ({})
        },
        slots: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Array,
            default: () => []
        },
        dataSource: {
            type: Array,
            default: () => []
        }
    },
    setup(props, _ref) {
        const {instance = {}, slots} = props;
        const {config = {}} = instance
        const unpack = (config = {}) => {
            const copyConfig = {...config};
            return reactive(copyConfig)
        }
        watch(config.dataSource, (newValue, oldValue) => {
            console.log("我是变化前后的值", newValue, oldValue)
        }, { deep: true }) // 要使用deep进行深度的监听
        return () => {
            return (
                <a-table
                    {...unpack(config)} 
                    v-slots={slots}
                >
                </a-table>
            )
        }
    }
})

export default withSomeData(Index, SuperTable)