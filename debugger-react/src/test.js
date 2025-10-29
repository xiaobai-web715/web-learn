const Test = ({ count }) => {
    const now = performance.now();
    while(performance.now() - now < 1){
        // 每个组件空转1毫秒
    }
    return (
        <div>
            <h1>count: {count}</h1>
        </div>
    )
}

export default Test