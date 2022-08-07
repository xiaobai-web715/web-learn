import React from 'react'
import {useSelector} from 'react-redux'
import { AddPostForm } from './AddPostForm';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { Link } from 'react-router-dom';

const PostsList = () => {
    const posts = useSelector(state => state.postsSlice);
    //对帖子按时间进行排序 => 我之前遇到过这样子的问题(你不能直接像状态这样的元素组)
    const renderedPosts = [...posts].sort((a, b) => {
        // console.log('我的两个是什么', new Date(b.date), new Date(a.date));
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
    ));
    // const renderedPosts = posts.map(post => (
    //     <article key={post.id}>
    //         <h3>{post.title}</h3>
    //         <PostAuthor userId={post.use}></PostAuthor>
    //         <p>{post.content.substring(0, 100)}</p>
    //         <Link to={`/ReduxPosts/${post.id}`}>View Post</Link>
    //         <TimeAgo timestamp={post.date}></TimeAgo>
    //     </article>
    // ))
    return (
        <React.Fragment>
            <AddPostForm></AddPostForm>
            <section>
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        </React.Fragment>
    )
}

export default PostsList