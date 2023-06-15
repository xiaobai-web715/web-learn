import TodoListReducer from './todoListReducer';
import PostsSliceReducer from './postsSlice';
import {combineReducers} from 'redux';
import usesReducer from './usersSlice';

const Reducer = combineReducers({
    todoList: TodoListReducer,
    postsSlice: PostsSliceReducer,
    users: usesReducer,
});
export default Reducer;