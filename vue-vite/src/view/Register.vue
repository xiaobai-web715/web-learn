<template>
    <div class="registerPage">
        <div class="registerTitle">
            注册信息
        </div>
        <el-form
            label-width="80px"
        >
            <el-form-item label="用户名:">
                <el-input
                    v-model="registerInfo.user"
                    class="input-style"
                />
            </el-form-item>
            <el-form-item label="密码:">
                <el-input
                    v-model="registerInfo.password"
                    type="password"
                    class="input-style"
                />
            </el-form-item>
            <el-form-item label="确认密码:">
                <el-input
                    v-model="registerInfo.againPassword"
                    type="password"
                    class="input-style"
                />
            </el-form-item>
        </el-form>
        <div class="registerButton">
            <el-button
                type="primary"
                @click="registerUserInfo"
            >
                注册
            </el-button>
        </div>
    </div>
</template>
<script lang="ts">
import {ref} from 'vue';
import request from '@/http/index';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
interface IRegisterInfo {
    user: string,
    password: string,
    againPassword: string
}
export default {
    setup() {
        const registerInfo = ref<IRegisterInfo>({
            user: '',
            password: '',
            againPassword: ''
        });
        const router = useRouter();
        return {
            registerInfo,
            router,
        };
    },
    methods: {
        registerUserInfo() {
            request({url: '/admin/user/register', method: 'post', params: this.registerInfo}).then(res => {
                console.log('注册结果', res);
                if (res.code === 200) {
                    ElMessage({
                        message: '用户注册成功',
                        type: 'success'
                    });
                    this.router.back();
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.registerPage{
    @include fixedCenter;
    .registerTitle{
        text-align: center;
        margin-bottom: 20px;
    }
    .input-style{
        width: 200px;
    }
    .registerButton{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>