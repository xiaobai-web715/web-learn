import { configureStore } from "@reduxjs/toolkit"
import messageReducer from "./reducer/messageReducer"

const store =  configureStore(
    {
        reducer: {
            messageBus: messageReducer
        }
    }
)

export default store

export type AppStore = ReturnType<typeof store.getState> 

export type AppDispatch = typeof store.dispatch