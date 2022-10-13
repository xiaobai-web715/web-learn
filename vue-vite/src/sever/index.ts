import axios from '@/http/index';
const getUserRouteList = () => {
    return axios.post('/api/vueVite/user_router_list', {
    }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });
};

const useSubmit = (params:{account: String, password: String}) => {
    return axios({
        method: 'post',
        url: '/api/vueVite/userToken',
        data: params
    }).then(res => res).catch(err => {
        console.log(err);
    });
};

export {
    getUserRouteList,
    useSubmit,
};