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
                prop="name"
            >
                <el-input
                    v-model="formData.name"
                    placeholder="请输入医院名称"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院地址"
                prop="address"
            >
                <el-input
                    v-model="formData.address"
                    placeholder="请输入医院地址"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院电话"
            >
                <el-input
                    v-model="formData.phone"
                    placeholder="请输入医院电话"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item label="医院性质">
                <el-select
                    v-model="formData.nature"
                    placeholder="请选择医院性质"
                >
                    <el-option
                        v-for="{title, value} in natures"
                        :key="value"
                        :value="title"
                        :label="title"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="官网地址">
                <el-input
                    v-model="formData.link"
                    placeholder="请输入医院电话"
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
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus';
import {natures} from './enum';
import request from '@/http';
const formData = ref({
    name: '',
    address: '',
    phone: '',
    nature: '',
    link: '',
});
const rules = {
    name:[
        {required:true,message:'请输入医院名称'}
    ],
    address: [
        {required:true,message: '请输入医院地址'}
    ]
};
const submit = () => {
    request('/vueVite/admin/hosp/add', 'post', formData.value).then(res => {
        console.log('res', res);
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