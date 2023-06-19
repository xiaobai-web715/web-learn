interface StateI {
    count: number
}
const firstStore = {
    state: { //state代表初始状态
        count: 11,
    },
    mutations: { //相当于react当中的reducer函数
        increment(state: StateI, payload: any) {
            state.count += payload.num;
        }
    }
};
export default firstStore;