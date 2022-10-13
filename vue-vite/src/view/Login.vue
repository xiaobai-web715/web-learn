<template>
    <div>登录页面</div>
    <div>
        <form>
            <input v-model="formData.account"><br>
            <input
                v-model="formData.password"
                type="password"
            >
        </form>
        <button @click="submit">
            登录
        </button>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {useSubmit} from '../sever/index';
import {useStore} from 'vuex';
import {SET_AUTH} from '@/store/actionsTypes';
const store = useStore();
const router = useRouter();
const formData = ref({
    account:'',
    password:'',
});
const submit = () => {
    useSubmit(formData.value).then(res => {
        if ( res.code === 200) {
            store.dispatch(SET_AUTH, {token: true});
            router.push('/');
        }
    });
};
</script>