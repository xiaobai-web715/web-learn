import { SET_ROUTE_TREE } from "@/store/actionsTypes";
import { IState } from "@/store/state";
import { IRoute } from "@/typings/sever";
import {RouteRecordRaw, Router} from 'vue-router';
import {Store} from 'vuex';
import {dynamicRouter} from '@/router/index';

function generateRouter (routeTree: IRoute[]):RouteRecordRaw[] {
    let newRoutes = routeTree.map(route => {
        let _route:RouteRecordRaw = {
            path: route.path,
            name: route.name,
            component: () => import(`/* webpackChunkName: "${route.name}" */@/view/${route.name}.vue`),
            children: [],
        };
        if(route.children) {
            _route.children = generateRouter(route.children);
        }
        return _route;
    });
    return newRoutes;
}

export function routerBeforeEach(router: Router, store: Store<IState>) {
    router.beforeEach((to, from, next) => {
        let token = store.state.token;
        if (!token) {
            // next()才是放行的意思如果这里不加入判断知识next('/login')那就是死循环router.beforeEach(('/login', from, next) => {})
            if (to.path === '/login') {
                next();
            } else {
                next('/login');
            }
        } else {
            if (store.state.routeTree.length > 0) {
                next();
            } else {
                store.dispatch(SET_ROUTE_TREE).then(res => {
                    let resultRouter = generateRouter(res);
                    // !解决ts报错children对象可能不存在,用!判断对象是否存在后再push进去
                    dynamicRouter[0].children!.push(...resultRouter);
                    store.commit(SET_ROUTE_TREE, dynamicRouter);
                    dynamicRouter.forEach(route => router.addRoute(route));
                    next({...to, replace: true}); //next({...to})要紧跟动态路由添加之后,否则会一直刷新
                });
            }
        }
    });
}