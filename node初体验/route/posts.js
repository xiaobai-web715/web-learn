const express = require('express');
const router = express.Router();

router.get('/posts',  (req, res) => {
    res.send(JSON.stringify({
        list: [
            { id: '1', title: 'First Post!', content: 'Hello!' , date: sub(new Date(), {minutes: 10}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), {minutes: 5}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '3', title: 'Three Post!', content: 'Javascript!' , date: sub(new Date(), {minutes: 3}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }},
            { id: '4', title: 'Four Post', content: 'Node', date: sub(new Date(), {minutes: 20}).toISOString(), reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0
            }}
        ]
    }))
})
module.exports = router;