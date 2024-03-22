import withSomeData from "../Component.tsx"
const Index = (props) => {
    console.log("我是传递进来的props", props)
    return (
        <a-descriptions {...props} v-slots={props.slots}></a-descriptions>
    )
}

export default withSomeData(Index)