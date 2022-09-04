//创建路由模块
const express = require('express');
const router = express.Router();

router.get('/todoList', (req, res) => {
    res.send(JSON.stringify({
        list: [
            {taskId: 1, value: '吃饭'},
            {taskId: 2, value: '睡觉'},
            {taskId: 3, value: '打豆豆'},
        ]
    }))
});

module.exports = router;