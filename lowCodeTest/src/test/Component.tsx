import {ref} from "vue"
// 对原子组件进行封装
function withSomeData(WrapperComponent) {
    return class MyComponent {
        config: Record<string, any>
        constructor(props = {}) {
            this.config = {} // config需要变成响应式(但这里变成响应式导致页面刷新过多，所以要变一下方式)
            this.config['data'] = ref(null);
            Object.entries(props).forEach(([key, value]) => {
                this.set$store(key, value)
            }),
            // 创建一个响应式的data属性
            this.render = this.render.bind(this)
        }
        set$store(key, value) {
            if (key === "data") {
                this.config[key].value = value;
            } else {
                this.config[key] = value
            }
            return this;
        }
        async getData(store) {
            if (this.config?.loadData) {
                const result = await this.config?.loadData(store);
                this.set$store('data', ref(result))
            }
        }
        render(props) {
            this.getData(props.$attrs.store)
            return <WrapperComponent {...this.config} slots={props.$slots}></WrapperComponent>
        }
    }
}

export default withSomeData