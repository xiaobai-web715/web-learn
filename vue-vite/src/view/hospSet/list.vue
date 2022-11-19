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
                <el-form-item label="医院性质">
                    <el-select
                        v-model="formData.nature"
                        placeholder="请选择医院等级"
                    >
                        <el-option
                            v-for="item in natures"
                            :key="item.value"
                            :label="item.title"
                            :value="item.title"
                        />
                    </el-select>
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
                ref="tableHosp"
                :data-list="dataList"
                :colums="colums"
                :data-total="dataTotal"
                :table-info="tableState"
            />
        </div>
    </div>
    <el-dialog
        v-model="dialogEdit"
        title="编辑"
        center
    >
        <el-form
            ref="form"
            :model="formDataEdit"
            label-width="100px"
            label-position="right"
            :rules="rules"
        >
            <el-form-item
                label="医院名称"
                prop="name"
            >
                <el-input
                    v-model="formDataEdit.name"
                    placeholder="请输入医院名称"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院地址"
                prop="address"
            >
                <el-input
                    v-model="formDataEdit.address"
                    placeholder="请输入医院地址"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院电话"
            >
                <el-input
                    v-model="formDataEdit.phone"
                    placeholder="请输入医院电话"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item label="医院性质">
                <el-select
                    v-model="formDataEdit.nature"
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
                    v-model="formDataEdit.link"
                    placeholder="请输入医院官网地址"
                    class="el-input-style"
                />
            </el-form-item>
        </el-form>
        <template
            #footer
        >
            <el-button @click="editCancel">
                取 消
            </el-button>
            <el-button
                type="primary"
                @click="editSure"
            >
                确 定
            </el-button>
        </template>
    </el-dialog>
    <el-dialog
        v-model="dialogDelete"
        title="删除"
        center
    >
        <span>确定要删除当前信息吗</span>
        <template
            #footer
        >
            <el-button @click="deleteCancel">
                取 消
            </el-button>
            <el-button
                type="primary"
                @click="deleteSure"
            >
                确 定
            </el-button>
        </template>
    </el-dialog>
</template>
<script setup>
import Table from '../../components/assembly/tableAssembly/Table.vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElSelect, ElOption, ElMessage } from 'element-plus';
import axios from '@/http/index';
import {natures} from './enum';
import { onMounted, ref } from 'vue';
const formData = ref({
    name: '',
    number: '',
    nature: ''
});
const formDataEdit = ref({});
const tableHosp = ref();
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const deleteHospId = ref();
const dataList = ref([]);
const dataTotal = ref(0);
const rules = {
    name:[
        {required:true,message:'请输入医院名称'}
    ],
    address: [
        {required:true,message: '请输入医院地址'}
    ]
};
const editCancel = () => {
    dialogEdit.value = false;
    formDataEdit.value = {};
};
const editSure = () => {
    axios('/vueVite/admin/hosp/edit', 'post', formDataEdit.value).then(res => {
        if(res.code === 200) {
            ElMessage.success('修改成功');
            dialogEdit.value = false;
        }
    });
};
const deleteCancel = () => {
    dialogDelete.value = false;
};
const deleteSure = () => {
    axios('/vueVite/admin/hosp/delete', 'post', {_id:deleteHospId.value}).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功');
            dialogDelete.value = false;
        }
    });
};
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
let o = {
    title: '操作',
    buttons: [],
};
let editFun = {
    title: '编辑',
    type: 'primary',
    callback: (val, index) => {
        formDataEdit.value = val;
        dialogEdit.value = true;
    }
};
let deleteFun = {
    title: '删除',
    type: 'danger',
    callback: (val, index) => {
        console.log('val', val, index);
        dialogDelete.value = true;
        deleteHospId.value = val._id;
    }
};
o.buttons.push(editFun, deleteFun);
colums.push(o);
const getHospList = (params = {}) => {
    console.log('最终请求的参数', params);
    axios('/syt/hospList/findAll', 'post', params).then(res => {
        console.log('我是请求的参数', res);
        if (res.code === 200) {
            dataList.value = res.data.list;
            dataTotal.value = res.data.total;
        }
    });
};
onMounted(() => {
    tableHosp.value.search(1);
});
const search = () => {
    tableHosp.value.search(1);
};
const tableState = (params) => {
    getHospList({...formData.value, ...params.value});
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
.el-input-style{
    width: 300px;
}
</style>