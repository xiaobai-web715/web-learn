import React from 'react'
import {useSelector} from 'react-redux'
import { AddPostForm } from './AddPostForm';
import { Link, Outlet} from 'react-router-dom';

const PostsList = () => {
    const posts = useSelector(state => state.postsSlice);
    const renderedPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <Link to={`/ReduxPosts/${post.id}`}>View Post</Link>
        </article>
    ))
    return (
        <React.Fragment>
            <AddPostForm></AddPostForm>
            <section>
                <h2>Posts</h2>
                {renderedPosts}
            </section>
            <Outlet/>
        </React.Fragment>
    )
}

export default PostsList