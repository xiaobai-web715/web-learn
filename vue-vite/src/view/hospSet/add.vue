<template>
    <div class="header">
        <span>添加医院</span>
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
<script setup>
import {ref} from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElMessage } from 'element-plus';
import {status} from './enum';
import request from '@/http';
const formData = ref({
    hospname: '', // 医院名称
    contactsName: '', // 医院联系人姓名
    contactsPhone: '', // 医院联系人电话
    status: '', // 医院是否可用
    apiUrl: '', // 医院官网地址
});
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
const submit = () => {
    request('/vueVite/admin/hosp/add', 'post', formData.value).then(res => {
        if (res.code === 200) {
            ElMessage.success('添加成功');
        }
    });
    request({
        url: '/sytHospInfo/hospList/add',
        method: 'post',
        params: formData.value
    }).then(res => {
        if (res.code === 200) {
            ElMessage.success('添加成功');
        } else {
            ElMessage.fail('添加失败');
        }
    });
};
</script>
<style scoped lang="scss">
.header{
    margin: 20px 0 20px 20px;
    span{
        border-right:5px solid rgb(26, 156, 221);
        font-size:20px;
    }
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