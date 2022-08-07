import {createSlice, nanoid} from '@reduxjs/toolkit'
import { useId } from 'react';

const postsSlice = createSlice({
    name: 'posts',
    initialState: [
        { id: '1', title: 'First Post!', content: 'Hello!' },
        { id: '2', title: 'Second Post', content: 'More text' }
    ],
    reducers: {
        // postAdded(state, action){
        //     //再次重申一下 => 之所以可以这样写是因为createSlice里面内置了Immer库
        //     state.push(action.payload);
        // },
        postAdded: {
            reducer(state, action){
                state.push(action.payload);
            },
            prepare(title, content, useId){
                //接收多个参数返回一个我们想要的payload
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        use: useId,
                    }
                }
            }
        },
        postUpdated: {
            reducer(state, action){
                const {id , title, content} = action.payload;
                const existingPost = state.find(post => post.id =id);
                if(existingPost) {
                    existingPost.title = title;
                    existingPost.content = content;
                }
            },
            prepare(id, title, content){
                return {
                    payload: {
                        id,
                        title,
                        content,
                    }
                }
            }
        }
        // postUpdated(state, action){
        //     //对帖子进行编辑
        //     const {id, title, content} = action.payload;
        //     const existingPost = state.find(post => post.id === id);
        //     if(existingPost) {
        //         existingPost.title = title;
        //         existingPost.content = content;
        //     }
        // }
    }
})
export const {postAdded, postUpdated} = postsSlice.actions
export default postsSlice.reducer;