//为jest测试将服务器渲染的路由写在这里
const getForture = require('./fortune');

const notFoundPage = (req, res) => {
    res.status(404);
    console.log('....', getForture());
    res.render('404', { fortune: getForture()});
};

module.exports = {
    notFoundPage,
}