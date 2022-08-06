import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postAdded } from '../../reducer/postsSlice'; //导出action creator函数

export const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onSavePostClicked = () => {
        if(title && content){
            // dispatch(
            //     postAdded({
            //         id: nanoid(),
            //         title,
            //         content,
            //     })
            // ) //这里通过在reducer当中对reducer函数添加一个prepare函数进行取代(减少不同页面重复编写的低效)
            dispatch(postAdded(title, content));
            setTitle('');
            setContent('');
        }
    }
    return(
        <section>
            <h2>添加新帖子</h2>
            <form>
                <label htmlFor='postTitle'>帖子标题:</label>
                <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChanged}></input>
                <label htmlFor='postContent'>内容:</label>
                <textarea id='postContent' name='postContent' value={content} onChange={onContentChanged}></textarea>
                <button type='button' onClick={onSavePostClicked}>保存帖子</button>
            </form>
        </section>
    )
}