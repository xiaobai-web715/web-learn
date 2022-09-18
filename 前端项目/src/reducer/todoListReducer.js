import { createSlice } from "@reduxjs/toolkit";

const todoListReducer = createSlice({
    name: 'todoList',
    initialState: {
        value: 0,
    },
    reducers: {
        addValue(state, action){
            console.log('state', state.value, 'action', action);
            // state.value += action.payload; 但是好像state希望不变的吧
            state.value += action.payload; //这样的写法是对原来state的值进行了修改,而reducer规则当中的第2条是不允许对state进行修改也就是要保证纯函数的形式
            //这里官网给出的解释是@reduxjs/toolkit的createSlice在内部使用了immer库 => 这个库可以使我们更好的编写不可变的逻辑
        },
        decrementValue(state, action){
            console.log('state', state.value, 'action', action);
            return {
                ...state.value,
                value : state.value - action.payload,
            };
        },
        
    }
});
export const {addValue, decrementValue} = todoListReducer.actions;
export default todoListReducer.reducer;