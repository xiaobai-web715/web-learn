import { IRoute } from "@/typings/sever"

const formatRouteTree = (routeList: IRoute[]) => {
    const parent = routeList.filter(routeInfo => routeInfo.pid === 0);
    const child = routeList.filter(routeInfo => routeInfo.pid !== 0);
    
    //递归函数
    function dateToTree (parents: IRoute[], childs: IRoute[]) {
        parents.map(parent => {
            childs.map((child, index) => {
                if (parent.id === child.pid) {
                    let _childrens = JSON.parse(JSON.stringify(childs));
                    _childrens.splice(index, 1); //将当前子节点(是父节点的直接子路由)去掉
                    dateToTree([child], _childrens); //找寻当前子节点所包含的后续子节点
                    if (parent.children) {
                        parent.children.push(child);
                    } else {
                        parent.children =[child];
                    }
                }
            })
        })
    }
    dateToTree(parent, child);
    return parent;
}

export {
    formatRouteTree
}