import axios from '@/http/index';
// 可以对axios进行请求拦截比如添加sig参数
const getUserRouteList = () => {
    return axios(
        '/vueVite/user_router_list', 
        'post' ,
        {}
    ).then(res => res.data);
};

const useSubmit = (params:{account: String, password: String}) => {
    return axios(
        '/vueVite/userToken',
        'post',
        params
    );
};

export {
    getUserRouteList,
    useSubmit,
};