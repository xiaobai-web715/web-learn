const firstStore = {
    state: { //state代表初始状态
        count: 11,
    },
    mutations: { //相当于react当中的reducer函数
        increment(state, payload) {
            console.log('payload', payload);
            state.count += payload.num;
        }
    }
};
export default firstStore;