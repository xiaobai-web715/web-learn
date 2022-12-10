import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const PostAuthor = ({userId}) => {
    const author = useSelector(state => {
        return state.users.find(user => user.id === userId);
    });
    return <span>by {author? author.name : 'Unknown author'}</span>;
};

PostAuthor.propTypes = {
    userId: PropTypes.any,
};