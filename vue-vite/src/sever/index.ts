import axios from '@/http/index';
const getUserRouteList = (uid: number) => {
    return axios.post('/api/vueVite/user_router_list', {
        uid,
    }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });
};

export {
    getUserRouteList,
};