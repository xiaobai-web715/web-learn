import {h} from "vue"
const isClass = (component) => {
    return component.prototype && component.prototype.constructor === component
}
const isFun = (func) => {
    return typeof func === 'function'
}
function createElementContent(allocation) {
    if (typeof allocation === "function") {
        const result =  allocation(this); // 函数执行有可能返回的还是一个对象
        if (typeof result === "object") {
            console.log("我是返回的对象内容", result)
            return createElementContent.call(this, result)
        } else {
            return result
        }
    } else {
        const {Components, config, children, vid} = allocation;
        if (Components) {
            if (isFun(Components)) {
                let Instance;
                let props = {store: this}
                if (isClass(Components)) {
                    Instance = new Components(config);
                    vid && (this[vid] = Instance);
                } else {
                    // 像description-item这样内嵌的无法自动调用类组件内部的render方法，改为直接借助函数组件进行处理
                    props = {...props, ...config}
                    Instance =  Components(props)
                }
                return (
                    <Instance store={props}>
                        {
                            Array.isArray(children) && children.length > 0 ? (
                                children.map(config => createElementContent.call(this, config))
                            ) : ''
                        }
                    </Instance>
                )
            } else {
                const childrenList = (children ?? []).map(config => createElementContent.call(this, config)) || ''
                return h(
                    Components,
                    config ?? {},
                    childrenList
                )
            }
        } else {
            return Array.isArray(children) ? children.map(config => createElementContent.call(this, config)) : allocation
        }
    }
}
const Render = (props) => {
    const {config, store} = props;
    return (
        createElementContent.call(store, config)
    )
}

export default Render;