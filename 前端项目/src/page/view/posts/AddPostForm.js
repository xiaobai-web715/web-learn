import React, {useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { postAdded } from 'src/reducer/postsSlice'; //导出action creator函数

export const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    // 获取用户列表
    const users = useSelector(state => state.users);
    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);
    const onSavePostClicked = () => {
            // dispatch(
            //     postAdded({
            //         id: nanoid(),
            //         title,
            //         content,
            //     })
            // ) //这里通过在reducer当中对reducer函数添加一个prepare函数进行取代(减少不同页面重复编写的低效)
            dispatch(postAdded(title, content, userId));
            setTitle('');
            setContent('');
            setUserId('');
    };
    //将用户列列表变成下拉框
    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    //当标题作者内容都存在的时候才让他发表
    const canSave = Boolean(title) && Boolean(userId) && Boolean(content);
    return(
        <section>
            <h2>添加新帖子</h2>
            <form>
                <label htmlFor='postTitle'>帖子标题:</label>
                <input type='text' id='postTitle' name='postTitle' value={title} onChange={onTitleChanged}></input>
                <label htmlFor='postAuthor'>Author:</label>
                <select value={userId} onChange={onAuthorChanged}>
                    <option value=''></option>
                    {usersOptions}
                </select>
                <label htmlFor='postContent'>内容:</label>
                <textarea id='postContent' name='postContent' value={content} onChange={onContentChanged}></textarea>
                <button type='button' onClick={onSavePostClicked} disabled={!canSave}>保存帖子</button>
            </form>
        </section>
    );
};