import {h} from "vue"
function createElementContent(allocation) {
    console.log("render函数执行了吗", this, typeof allocation)
    if (typeof allocation === "function") {
        console.log("我是一个函数", this)
        return allocation(this);
    } else if (typeof allocation === "string") {
        return allocation
    } else {
        const {Components, config, children, vid} = allocation;
        if (Components) {
            if (typeof Components === "string") {
                const childrenList = (children ?? []).map(config => createElementContent.call(this, config)) || ''
                return h(
                    Components,
                    config ?? {},
                    childrenList
                )
            } else {
                const Instance = new Components(config);
                if (vid) {
                    this[vid] = Instance;
                }
                return (
                    <Instance store={this}>
                        {
                            Array.isArray(children) && children.length > 0 ? (
                                children.map(config => createElementContent.call(this, config))
                            ) : ''
                        }
                    </Instance>
                )
            }
        } else {
            return (children ?? []).map(config => createElementContent.call(this, config)) || ''
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