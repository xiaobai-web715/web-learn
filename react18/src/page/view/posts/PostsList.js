import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPosts} from 'src/reducer/postsSlice';
import { AddPostForm } from './AddPostForm';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { Link } from 'react-router-dom';
import Loading from 'src/components/Loading/loading';

const PostsList = () => {
    const postStatus = useSelector(state => state.postsSlice.status);
    const dispatch = useDispatch();
    // const fetchPosts = createAsyncThunk('posts/fetchPosts', 
    //     async () => {
    //         const res =  await axios.get('/fakeApi/posts')
    //         return res.list;
    //     }
    // )
    // const posts = useSelector(state => state.postsSlice.posts);
    //对帖子按时间进行排序 => 我之前遇到过这样子的问题(你不能直接像状态这样的元素组)
    // const renderedPosts = [...posts].sort((a, b) => {
    //     // console.log('我的两个是什么', new Date(b.date), new Date(a.date));
    //     return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    // }).map(post => (
    //     <article key={post.id}>
    //          <PostAuthor userId={post.use}></PostAuthor>
    //          <p>{post.content.substring(0, 100)}</p>
    //          <Link to={`/ReduxPosts/${post.id}`}>View Post</Link>
    //          <h3>{post.title}</h3>
    //          <TimeAgo timestamp={post.date}></TimeAgo>
    //          <ReactionButtons post={post}></ReactionButtons>
    //      </article>
    // ));
    // const renderedPosts = posts.map(post => (
    //     <article key={post.id}>
    //         <h3>{post.title}</h3>
    //         <PostAuthor userId={post.use}></PostAuthor>
    //         <p>{post.content.substring(0, 100)}</p>
    //         <Link to={`/ReduxPosts/${post.id}`}>View Post</Link>
    //         <TimeAgo timestamp={post.date}></TimeAgo>
    //     </article>
    // ))
    useEffect(() => {
        if(postStatus === 'idle'){
            //用express模拟请求测试createAsyncThunk
            dispatch(fetchPosts()); //这里一样也是可以dispatch这个createAsyncThunk构造的
        }
    },[]);
    const posts = useSelector(state => state.postsSlice.posts);
    const error = useSelector(state => state.postsSlice.error);
    let content = null;
    if(postStatus === 'loading'){
        content = (
            <Loading></Loading>
        );
    }else if(postStatus === 'succeeded'){
        content = Array.isArray(posts) ? [...posts].sort((a, b) => {
            return new Date(b.date).valueOf() - new Date(a.date).valueOf();
        }).map(post => (
            <article key={post.id}>
                <PostAuthor userId={post.use}></PostAuthor>
                <p>{post.content.substring(0, 100)}</p>
                <Link to={`/ReduxPosts/${post.id}`}>View Post</Link>
                <h3>{post.title}</h3>
                <TimeAgo timestamp={post.date}></TimeAgo>
                <ReactionButtons post={post}></ReactionButtons>
            </article>
        )) : '';
    }else if(postStatus === 'failed'){
        content = <div>{error}</div>;
    }
    return (
        <React.Fragment>
            <AddPostForm></AddPostForm>
            <section>
                <h2>Posts</h2>
                {content}
            </section>
        </React.Fragment>
    );
};

export default PostsList;