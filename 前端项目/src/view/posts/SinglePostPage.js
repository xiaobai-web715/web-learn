import React from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

export const SinglePostPage = () => {
    const {postId} = useParams();
    const post = useSelector(state => state.postsSlice.find(post => post.id === postId));
    const navigate = useNavigate();
    if(!post){
        return (
            <section>
                <h2>要去请求对应的信息</h2>
            </section>
        )
    }
    const goPage = () => {
        navigate('/ReduxPosts');
    }
    return (
        <section>
            <button onClick={goPage}>点击返回原页面</button>
            <article>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <Link to={`/ReduxPosts/editPost/${postId}`}>
                    Edit Post
                </Link>
            </article>
        </section>
    )
}