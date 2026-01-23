import CorresPoand from "@//utils/correspond";
import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
    value: CorresPoand | null
}
const initialState:InitialState = {
    value: null
}

export const messageSlice = createSlice({
    name: 'messageBus',
    initialState,
    reducers: {
        init: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {init} = messageSlice.actions

export default messageSlice.reducer