import React from 'react';
import {parseISO, formatDistanceToNow} from 'date-fns';
import PropTypes from 'prop-types';

export const TimeAgo = ({timestamp}) => {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    return <span title={timestamp}>&nbsp; <i>{timeAgo}</i></span>;
};

TimeAgo.propTypes = {
    timestamp: PropTypes.any
};