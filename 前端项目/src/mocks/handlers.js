import {rest} from 'msw';

export const handlers = [
    // res.post('/login', null) => 这个是请求处理程序
    //(req, res, ctx) => {} => 这个是响应解析器
    rest.post('/login', (req, res, ctx) => {
        sessionStroage.setItem('is-authenticates', 'true');
        return res(
            ctx.status(200),
        )
    }),
    rest.get('/user', (req, res, ctx) => {
        const isAuthenticated = sessionStorage.getItem('is-authenticates');
        if(!isAuthenticated){
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                })
            )
        }
        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            })
        )
    })
]