import {ref} from "vue"
// 对原子组件进行封装
function withSomeData(WrapperComponent) {
    return class MyComponent {
        config: Record<string, any>
        constructor(props = {}) {
            console.log("我是传递进来的props", props)
            this.config = {} // config需要变成响应式(但这里变成响应式导致页面刷新过多，所以要变一下方式)
            Object.entries(props).forEach(([key, value]) => {
                this.set$store(key, value)
            }),
            this.render = this.render.bind(this)
        }
        set$store(key, value) {
            this.config[key] = value
            return this;
        }
        async getData(store) {
            if (this.config?.loadData) {
                const result = await this.config?.loadData(store);
                console.log("我是请求的值", ref(result).value)
                this.set$store('data', ref(result))
            }
        }
        render(props) {
            console.log("我是render执行的this", this, props)
            this.getData(props.$attrs.store)
            return <WrapperComponent {...this.config} slots={props.$slots}></WrapperComponent>
        }
    }
}

export default withSomeData