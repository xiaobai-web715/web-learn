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
                        v-model="formData.hospname"
                        placeholder="医院名称"
                        clearable
                    />
                </el-form-item>
                <!-- 现在只增加这两个搜索,医院所在地的模糊搜索之后再添加 -->
                <!-- <el-form-item label="医院所在地">
                    <el-input
                        v-model="formData.hospAddress"
                        placeholder="请选择医院所在地"
                    />
                </el-form-item> -->
                <el-form-item label="医院是否可用">
                    <el-select
                        v-model="formData.status"
                        placeholder="请选择医院等级"
                        clearable
                    >
                        <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.title"
                            :value="item.value"
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
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="importData"
                    >
                        导出数据
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
            label-width="100px"
            label-position="right"
        >
            <el-form-item
                label="医院名称"
            >
                <el-input
                    v-model="formDataEdit.hospname"
                    placeholder="请输入医院名称"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="医院联系人"
            >
                <el-input
                    v-model="formDataEdit.contactsName"
                    placeholder="请输入医院联系人"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item
                label="联系人电话"
            >
                <el-input
                    v-model="formDataEdit.contactsPhone"
                    placeholder="请输入联系人电话"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item label="官网地址">
                <el-input
                    v-model="formDataEdit.apiUrl"
                    placeholder="请输入医院官网地址"
                    class="el-input-style"
                />
            </el-form-item>
            <el-form-item label="是否可用">
                <el-select v-model="formDataEdit.status">
                    <el-option
                        v-for="({title, value}) in status"
                        :key="value"
                        :label="title"
                        :value="value"
                    />
                </el-select>
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
import { ElMessage } from 'element-plus';
// import { ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElSelect, ElOption, ElMessage } from 'element-plus';
import request from '@/http/index';
import {status} from './enum';
import { onMounted, ref } from 'vue';
import moment from 'moment';
const formData = ref({
    hospname: '',
    // number: '',
    status: ''
});
const formDataEdit = ref({});
const tableHosp = ref();
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const deleteHospId = ref();
const dataList = ref([]);
const dataTotal = ref(0);
const editCancel = () => {
    dialogEdit.value = false;
    formDataEdit.value = {};
};
const editSure = () => {
    request({url: '/sytHospInfo/hospList/edit', method: 'post', params: formDataEdit.value}).then(res => {
        console.log('res', res);
        if(res.code === 200) {
            ElMessage.success('修改成功');
            dialogEdit.value = false;
            getHospList({...formData.value});
        }
    });
};
const deleteCancel = () => {
    dialogDelete.value = false;
};
const deleteSure = () => {
    request({url: '/vueVite/admin/hosp/delete', method: 'post', params: {_id:deleteHospId.value}}).then(res => {
        if (res.code === 200) {
            ElMessage.success('删除成功');
            dialogDelete.value = false;
        }
    });
};
const colums = [
    {
        title: '医院名称',
        prop: 'hospname',
    },
    {
        title: '医院联系人',
        prop: 'contactsName',
    },
    {
        title: '联系人电话',
        prop: 'contactsPhone',
    },
    {
        title: '医院官网',
        prop: 'apiUrl',
    },
    {
        title: '医院状态',
        prop: 'status',
        custom: (val, row) => {
            if (val) return '可用';
            else return '不可用';
        }
    },
    {
        title: '创建时间',
        prop: 'createTime', //引入moment来生成时间
        minWidth: 150,
        custom: (val, row) => {
            return moment(val).format('YYYY-MM-DD hh:mm:ss');
        }
    },
    {
        title: '更新时间',
        prop: 'updateTime',
        minWidth: 150,
        custom: (val, row) => {
            return moment(val).format('YYYY-MM-DD hh:mm:ss');
        }
    }
];
let o = {
    title: '操作',
    fixed: 'right',
    buttons: [],
};
let editFun = {
    title: '编辑',
    type: 'primary',
    callback: (val, index) => {
        const {id, hospname, contactsName, contactsPhone, apiUrl, status} = val;
        formDataEdit.value = {id, hospname, contactsName, contactsPhone, apiUrl, status};
        dialogEdit.value = true;
    }
};
let deleteFun = {
    title: '删除',
    type: 'danger',
    callback: (val, index) => {
        dialogDelete.value = true;
        deleteHospId.value = val._id;
    }
};
o.buttons.push(editFun, deleteFun);
colums.push(o);
const getHospList = (params = {}) => {
    console.log('params', params);
    request({url: '/sytHospInfo/hospList/query', method: 'post', params}).then(res => {
        if (res.code === 200) {
            //接口暂时不返回对象的data与total
            dataList.value = res.data;
            dataTotal.value = res.data?.length;
            // dataTotal.value = res.data.total;
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
    console.log('params', params);
    getHospList({...formData.value, ...params});
};
const importData = () => {
    // 对获取的excel的数据进行导出
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