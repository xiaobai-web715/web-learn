
const getParams = (req: { body?: object, query?: object }): object => {
  const params: object = req.body // req.body是post请求的时候通过中间件解析出来的
  if (req.query) { // req.query是get请求的参数
    Object.entries(req.query).forEach(([key, value]) => {
      params[key] = value
    })
  }
  return params
}

module.exports = {
  getParams
}

export {}
