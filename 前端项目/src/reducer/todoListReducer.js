import { createSlice } from "@reduxjs/toolkit";

const todoListReducer = createSlice({
    name: 'todoList',
    initialState: {
        value: 0,
    },
    reducers: {
        addValue(state, action){
            console.log('state', state, 'action', action);
            // state.value += action.payload; 但是好像state希望不变的吧
            state.value += action.payload;
        }
    }
})
export const {addValue} = todoListReducer.actions;
export default todoListReducer.reducer;