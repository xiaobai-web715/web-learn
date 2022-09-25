// 为jest测试将服务器渲染的路由写在这里
const getForture = require('./fortune')

const home = (req, res) => {
  // res.status(200);
  res.render('home')
}
const about = (req, res) => {
  // res.status(200);
  res.render('about', { fortune: getForture() })
}
const notFoundPage = (req, res) => {
  // res.status(404);
  console.log('....', getForture())
  res.render('404', { fortune: getForture() })
}
const severError = (err, req, res, next) => {
  // res.status(500);
  if (err) {
    console.log('....', getForture())
    res.render('500')
  }
}

module.exports = {
  home,
  about,
  notFoundPage,
  severError
}
