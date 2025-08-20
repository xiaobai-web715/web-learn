import React from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

const SinglePostPage = () => {
    const {postId} = useParams();
    const post = useSelector(state => state.postsSlice.posts.find(post => post.id === postId));
    const navigate = useNavigate();
    if(!post){
        return (
            <section>
                <h2>要去请求对应的信息</h2>
            </section>
        );
    }
    const goPage = () => {
        navigate('/ReduxPosts');
    };
    return (
        <section>
            <button onClick={goPage}>点击返回原页面</button>
            <article>
                <h2>{post.title}</h2>
                <PostAuthor userId={post.use}></PostAuthor>
                <p>{post.content}</p>
                <TimeAgo timestamp={post.date}></TimeAgo>
                <ReactionButtons post={post}></ReactionButtons>
                <Link to={`/ReduxPosts/editPost/${postId}`}>
                    Edit Post
                </Link>
            </article>
        </section>
    );
};

export default SinglePostPage;