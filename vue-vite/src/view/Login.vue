<template>
    <div class="loginPage">
        <div class="useLogin">
            用户登录
        </div>
        <form class="loginForm">
            <label for="user">用户名:</label>
            <input
                id="user"
                v-model="formData.user"
            ><br>
            <label for="password">密码:</label>
            <input
                id="password"
                v-model="formData.password"
                type="password"
            >
        </form>
        <div class="buttons">
            <button
                @click="submit"
            >
                登录
            </button>
            <button @click="register">
                注册
            </button>
        </div>
    </div>
</template>
<script>
// setup模式下可以在export default{}使用useRouter以及useStore生成全局变量,但组合式情况下不生效
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import request from '@/http/index';
import {useStore} from 'vuex';
import {SET_AUTH} from '@/store/actionsTypes';
import {loginInfos} from './enums';
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const formData = ref({
            user:'',
            password:'',
        });
        return {
            formData,
            router,
            store
        };
    },
    methods: {
        submit() {
            request({
                url: '/sytUser/login',
                method: 'post',
                params: this.formData
            }).then(res => {
                console.log('res', res, this.store);
                if (res.code === 200) {
                    this.store.dispatch(SET_AUTH, {token: true});
                    sessionStorage.setItem('token', true);
                    this.router.push('/');
                } else {
                    const code = res.code;
                    const message = loginInfos.find(item => item.code == code).message;
                    this.$message.error(message);
                }
            });
        },
        register() {
            console.log('触发注册功能');
            this.router.push('/register');
        }
    }
};
</script>
<style lang="scss" scoped>
.loginPage{
    @include fixedCenter;
    height: 250px;
    .useLogin{
        text-align: center;
        margin-bottom: 30px;
    }
    .loginForm{
        display: inline-block;
        label{
            margin-right: 10px;
            width: 60px;
            display: inline-block;
            text-align: right;
        }
        input{
            display: inline-block;
            width: 200px;
            height: 30px;
            outline: none;
            margin-bottom: 15px;
        }
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        button{
            display: block;
            width: 60px;
            height: 40px;
            border: none;
            border-radius: 10px;
            &:nth-child(1) {
                margin-right: 20px;
                background-color: #5A88FB;
                color: #FFF;
            }
        }
    }
}
</style>