import TodoListReducer from './todoListReducer'
import PostsSliceReducer from './postsSlice'
import {combineReducers} from 'redux'

const Reducer = combineReducers({
    todoList: TodoListReducer,
    postsSlice: PostsSliceReducer,
})
export default Reducer