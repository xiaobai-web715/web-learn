import { IRoute } from "@/typings/sever";

const formatRouteTree = (routeList: IRoute[]) => {
    const child = routeList.filter(routeInfo => routeInfo.ancestor !== routeInfo.descendant);
    const parent = routeList.filter(routeInfo => routeInfo.ancestor == routeInfo.descendant); //当两者相等的时候就是父元素
    let count = 1; // 记录层数，用来解决样式问题
    //递归函数
    function dateToTree(parents: IRoute[], childs: IRoute[], count: number) {
        parents.map(parent => {
            childs.map((child, index) => {
                if (parent.id === child.ancestor) {
                    let _childrens = JSON.parse(JSON.stringify(childs));
                    _childrens.splice(index, 1); //将当前子节点(是父节点的直接子路由)去掉
                    dateToTree([child], _childrens, count + 1); //找寻当前子节点所包含的后续子节点
                    if (parent.children) {
                        parent.children.push(child);
                    } else {
                        parent.children = [child];
                    }
                }
            });
            parent.className = `menu-${count}`;
        });
    }
    dateToTree(parent, child, count);
    return parent;
};

export {
    formatRouteTree
};