import withSomeData from "../Component.tsx"
function Index (props) {
    console.log("我是tabs传递进来的props", props)
    
    return (
        <a-tabs 
            {...props} 
            v-slots={props.slots}
        ></a-tabs>
    )
}

export default withSomeData(Index)