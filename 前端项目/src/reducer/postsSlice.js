import {createSlice, nanoid, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
//目测来看createAsyncThunk生成的函数还必须写在和reducer函数同一个文件夹当中(因为extraReducers后面的链式结构会用到这个名字)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', 
    async () => {
        const res =  await axios.get('/api/fakeApi/posts')
        return res.data.list;
    }
)
const postsSlice = createSlice({
    name: 'posts',
    // initialState: [
    //     { id: '1', title: 'First Post!', content: 'Hello!' , date: sub(new Date(), {minutes: 10}).toISOString(), reactions: {
    //         thumbsUp: 0,
    //         hooray: 0,
    //         heart: 0,
    //         rocket: 0,
    //         eyes: 0
    //     }},
    //     { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), {minutes: 5}).toISOString(), reactions: {
    //         thumbsUp: 0,
    //         hooray: 0,
    //         heart: 0,
    //         rocket: 0,
    //         eyes: 0
    //     }},
    // ],
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
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
                        date: new Date().toISOString(),
                        title,
                        content,
                        use: useId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        postUpdated: {
            reducer(state, action){
                const {id , title, content, date} = action.payload;
                const existingPost = state.posts.find(post => post.id =id);
                if(existingPost) {
                    existingPost.title = title;
                    existingPost.content = content;
                    existingPost.date = date;
                }
            },
            prepare(id, title, content){
                return {
                    payload: {
                        id,
                        title,
                        content,
                        date: new Date().toISOString(),
                    }
                }
            }
        },
        // postUpdated(state, action){
        //     //对帖子进行编辑
        //     const {id, title, content} = action.payload;
        //     const existingPost = state.find(post => post.id === id);
        //     if(existingPost) {
        //         existingPost.title = title;
        //         existingPost.content = content;
        //     }
        // }
        reactionAdded: {
            prepare(postId, reaction){
                return {
                    payload: {
                        postId, //对应的文章id
                        reaction, //对应的表情
                    }
                }
            },
            reducer(state, action){
                const {postId, reaction} = action.payload;
                const existingPost = state.posts.find(post => post.id === postId);
                if(existingPost) {
                    existingPost.reactions[reaction] += 1;
                }
            }
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                console.log('action-pending', action);
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log('action-fulfilled', action);
                state.status = 'succeeded'
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log('action-rejected', action);
                state.status = 'failed'
                state.error = action.error.message;
            })
    }
})
export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions
export default postsSlice.reducer;