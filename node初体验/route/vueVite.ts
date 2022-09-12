import express, {Request, Response} from 'express';
import {users, routes, IUser, IRoute} from '../data/index'
const router = express.Router()
router.post('/user_router_list', (request: Request, response: Response) => {
    const { uid } = request.body;
    if (uid) {
        const userInfo: IUser | undefined = users.find(item => item.id === uid);
        if (userInfo) {
            const authRouteList: IRoute[] = [];
            userInfo.auth.map(rid => {
                routes.map((route: IRoute) => {
                    if(route.id === rid) {
                        authRouteList.push(route);
                    }
                })
            })

            response.status(200).send({
                data: authRouteList,
            })
        } else {
            response.status(200).send({
                msg: "No userInfo for this ID"
            })
        }
    } else {
        response.status(200).send({
            msg: "No UID"
        })
    }
})
export default router;