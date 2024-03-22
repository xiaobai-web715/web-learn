import withSomeData from "../Component.tsx"
function Index (props) {
    console.log("我是传递进来的props", props)
    return (
        <a-input {...props} onChange={(e) => {props.value.value = e.target.value; props.onChange(e)}}></a-input>
    )
}

export default withSomeData(Index)