const express = require('express')
const router = express.Router()

router.get('/hoc', (req, res) => {
    console.log('req', req.query)
    res.send(JSON.stringify(['react', 'redux', 'node', 'react-router', 'vue', 'vuex', 'vue-router']))
})

module.exports = router
