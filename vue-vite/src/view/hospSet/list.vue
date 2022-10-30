<template>
    <div class="header">
        <span>医院设置列表</span>
    </div>
    <div class="content">
        <div class="search">
            <el-form
                label-position="right"
                label-width="100px"
                :inline="true"
            >
                <el-form-item
                    label="医院名称"
                >
                    <el-input
                        v-model="formData.name"
                        placeholder="医院名称"
                    />
                </el-form-item>
                <el-form-item label="医院编号">
                    <el-input
                        v-model="formData.number"
                        placeholder="医院编号"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="search"
                    >
                        查询
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <Table
                :data-list="dataList"
                :colums="colums"
                :data-total="dataTotal"
            />
        </div>
    </div>
</template>
<script setup>
import Table from '../../components/assembly/tableAssembly/Table.vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import request from '@/http/index';
import { onMounted, ref } from 'vue';
const formData = ref({
    name: '',
    number: ''
});
const dataList = ref([]);
const dataTotal = ref(0);
const colums = [
    {
        title: '医院名称',
        prop: 'name',
    },
    {
        title: '医院地址',
        prop: 'address',
    },
    {
        title: '医院电话',
        prop: 'phone',
    },
    {
        title: '医院性质',
        prop: 'nature',
    },
    {
        title: '医院官网',
        prop: 'link',
    }
];
const getHospList = (params = {}) => {
    request('/vueVite/admin/hosp/hospitalList', 'post', params).then(res => {
        if (res.code === 200) {
            dataList.value = res.data.list;
            dataTotal.value = res.data.total;
        }
    });
};
onMounted(() => {
    getHospList();
});
const search = () => {
    getHospList(formData.value);
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
.content{
    margin-left: 30px;
    .search{
        margin-top: 10px;
    }
}
</style>