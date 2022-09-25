const express = require('express')
const router = express.Router()

router.get('/hoc', (req, res) => {
  res.send(JSON.stringify(['react', 'redux', 'node', 'react-router', 'vue', 'vuex', 'vue-router']))
})

module.exports = router
