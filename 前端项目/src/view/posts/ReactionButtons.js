import React from 'react';
import {reactionAdded} from '../../reducer/postsSlice'
import {useDispatch} from 'react-redux';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}
export const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()
    // Object.entries()返回一个可枚举的数组(包含对象键值对)
    // const [name, emoji] = [a, b] 数组的解构方式
    const addReaction = (postId, reaction) => {
        dispatch(reactionAdded(postId, reaction));
    }
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button key={name} type='button' onClick={() => {addReaction(post.id, name)}}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })
    return(
        <div>{reactionButtons}</div>
    )
}