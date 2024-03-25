import withSomeData from "../Component.tsx"
const Index = (props) => {
    return (
        <a-descriptions {...props} v-slots={props.slots}>
        </a-descriptions>
    )
}

export default withSomeData(Index)