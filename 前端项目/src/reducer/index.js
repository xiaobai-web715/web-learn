import TodoListReducer from './todoListReducer'
import {combineReducers} from 'redux'

const Reducer = combineReducers({
    todoList: TodoListReducer
})
export default Reducer