import { SET_ROUTE_TREE } from "@/store/actionsTypes";
import { IState } from "@/store/state";
import { IRoute } from "@/typings/sever";
import {RouteRecordRaw, Router} from 'vue-router';
import {Store} from 'vuex';
import {dynamicRouter} from '@/router/index';
import {
    qiankunWindow
} from 'vite-plugin-qiankun/dist/helper.js';

export interface IRouterRecordRaw{
    path: string,
    name: string,
    children: IRouterRecordRaw[],
    props: {title: string, filePath: string, className: string | undefined, hidden: boolean},
    component?: () => Promise<unknown>
}

let modules = import.meta.glob('../**/*.vue');
function generateRouter (routeTree: IRoute[]):IRouterRecordRaw[] {
    let newRoutes = routeTree.map(route => {
        let _route:IRouterRecordRaw = {
            path: route.path,
            name: route.name,
            // component: () => import(`/* webpackChunkName: "${route.name}" */@/view${route.filePath}.vue`),
            children: [],
            props: {
                title: route.title,
                filePath: route.filePath,
                className: route.className,
                hidden: route.filePath?.indexOf('add') > -1
            },
        };
        if (route.filePath) {
            Object.assign(_route, {component: modules[`../view${route.filePath}.vue`],});
            // Object.assign(_route, {component: () => import(`../view${route.filePath}.vue`)});
        }
        if(route.children) {
            _route.children = generateRouter(route.children);
        } 
        return _route;
    });
    return newRoutes;
}

export function routerBeforeEach(router: Router, store: Store<IState>) {
    router.beforeEach((to, from, next) => {
        console.log('router', store.state.routeTree, to.path.indexOf('/login') > -1, qiankunWindow);
        let token = store.state.token || sessionStorage.getItem('token');
        if (!token) {
            // next()才是放行的意思如果这里不加入判断知识next('/login')那就是死循环router.beforeEach(('/login', from, next) => {})
            if (to.path.indexOf('/login') > -1 || to.path.indexOf('/register') > -1) {
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