import withSomeData from "../Component.tsx"
import {ref, onMounted, defineComponent} from "vue"
const Index = defineComponent({
    props: {
        activeKey: {
            type: String,
            default: ''
        },
        slots: {
            type: Object,
            default: () => {}
        }
    },
    setup(props) {
        const activeKey = ref<string>('');
        onMounted(() => {
            activeKey.value = props.activeKey as string
        })
        return () => {
            return (
                <a-tabs
                    {...props} 
                    activeKey={activeKey.value}

                    onChange={(key) => {activeKey.value = key;}}
                    v-slots={props.slots}
                >
                </a-tabs>
            )
        }
    }
})

export default withSomeData(Index)