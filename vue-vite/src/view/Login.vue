<template>
    <div>
        <div>登录页面</div>
        <div>
            <form>
                <input v-model="formData.user"><br>
                <input
                    v-model="formData.password"
                    type="password"
                >
            </form>
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
import axios from '@/http/index';
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
            axios(
                '/sytUser/login',
                'post',
                this.formData
            ).then(res => {
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