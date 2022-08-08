import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { postUpdated } from '../../reducer/postsSlice';

export const EditPostForm = () => {
    const {postId} = useParams();
    const post = useSelector(state => state.postsSlice.posts.find(post => post.id === postId));
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const dispatch = useDispatch();
    const navgite = useNavigate();
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onSavePostClicked = (e) => {
        e.preventDefault();
        if(title && content){
            dispatch(postUpdated(postId, title, content));
            navgite(`/ReduxPosts/${postId}`)
        }
    }
    return (
        <section>
            <h2>编辑帖子</h2>
            <form>
                <label htmlFor='postTitle'>帖子标题:</label>
                <input type='text' id='postTitel' name='postTitle' placeholder="What's on your mind?" value={title} onChange={onTitleChanged}></input>
                <label htmlFor='postContent'>内容:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={onContentChanged}
                ></textarea>
                <input type='submit' onClick={onSavePostClicked}></input>
            </form>
        </section>
    )
}