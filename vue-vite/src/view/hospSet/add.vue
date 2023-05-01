<template>
    <div class="header">
        <TitleAss title="添加医院" />
    </div>
    <div class="content">
        <el-form
            ref="form"
            :model="formData"
            label-width="100px"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                label="医院名称"
                prop="hospname"
            >
                <el-input
                    v-model="formData.hospname"
                    placeholder="请输入医院名称"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院联系人"
                prop="contactsName"
            >
                <el-input
                    v-model="formData.contactsName"
                    placeholder="请输入医院联系人姓名"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="联系人电话"
                prop="contactsPhone"
            >
                <el-input
                    v-model="formData.contactsPhone"
                    placeholder="请输入医院联系人电话"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院状态"
                prop="status"
            >
                <el-select
                    v-model="formData.status"
                    placeholder="请选择医院状态"
                >
                    <el-option
                        v-for="{title, value} in status"
                        :key="value"
                        :value="value"
                        :label="title"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="医院官网">
                <el-input
                    v-model="formData.apiUrl"
                    placeholder="请输入医院官网地址"
                    class="el-input-style"
                />
            </el-form-item>
        </el-form>
        <div class="submit">
            <el-button
                type="primary"
                @click="submit"
            >
                提交
            </el-button>
        </div>
    </div>
</template>
<script>
import {ref} from 'vue';
import {status} from './enum';
import request from '@/http/index';
import { ElMessage } from 'element-plus';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
export default {
    components: {
        TitleAss: Title
    },
    setup() {
        const formData = ref({
            hospname: '', // 医院名称
            contactsName: '', // 医院联系人姓名
            contactsPhone: '', // 医院联系人电话
            status: '', // 医院是否可用
            apiUrl: '', // 医院官网地址
        });
        const id = ref();
        const rules = {
            hospname:[
                {required:true,message:'请输入医院名称'}
            ],
            contactsName: [
                {required:true,message: '请输入医院地址'}
            ],
            contactsPhone: [
                {required:true,message: '请输入医院地址'}
            ],
            status: [
                {required:true,message: '请输入医院地址'}
            ]
        };
        return {
            formData,
            rules,
            id,
            status
        };
    },
    mounted() {
        const {id} = this.$route.query || {};
        console.log('我是对应的id信息', this.$route.query);
        if (id) {
            this.id = id;
            request({
                url: '/admin/hospInfo/get/info', 
                method: 'post', 
                params: {id}
            }).then(res => {
                console.log('res', res);
                if (res.code === 200) {
                    //接口暂时不返回对象的data与total
                    this.formData = res.data;
                    // dataTotal.value = res.data.total;
                }
            });
        }
    },
    methods: {
        submit() {
            request({
                url: '/admin/hospInfo/add',
                method: 'post',
                params: {...this.formData, id: this.id}
            }).then(res => {
                if (res.code === 200) {
                    ElMessage({
                        message: `${this.id ? '编辑' : '添加'}成功`,
                        type: 'success'
                    });
                    this.$router.back();
                } else {
                    ElMessage({
                        message: `${this.id ? '编辑' : '添加'}失败`,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.header{
    margin: 20px 0 20px 20px;
}
.el-input-style{
    width: 300px;
}
.content{
    margin-left: 30px;
}
.submit{
    text-align:center;
}
</style>