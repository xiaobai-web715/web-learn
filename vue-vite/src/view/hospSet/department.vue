<template>
    <div class="header">
        <TitleAss title="医院科室" />
    </div>
    <div class="content"> 
        <el-form
            :model="formInfo"
            :inline="true"
            label-position="right"
            label-width="100px"
        >
            <el-form-item label="选择医院:">
                <el-select
                    v-model="formInfo.id"
                    placeholder="选择医院"
                >
                    <el-option
                        v-for="({id, hospName}) in hospList"
                        :key="id"
                        :label="hospName"
                        :value="id"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        <div class="setTitle">
            科室信息
        </div>
    </div>
</template>
<script>
import fetch from '@/http/index';
import { ref } from 'vue';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
export default {
    components: {
        TitleAss: Title
    },
    setup() {
        const hospList = ref([]);
        const formInfo = ref({
            id: ''
        });
        return {
            hospList,
            formInfo
        };
    },
    mounted() {
        fetch({
            url: '/sytHospInfo/hospList/get/briefInfo',
            method: 'post',
        }).then(res => {
            console.log('res', res);
            if (res.code == 200 && res.data) {
                this.hospList = res.data;
            }
        });
    }
};
</script>
<style lang="scss" scoped>
.header{
    margin: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    .title{
        border-right:5px solid rgb(26, 156, 221);
        font-size:20px;
        display: flex;
        align-items: center;
    }
}
.content{
    margin-left: 15px;
    .setTitle{
        margin-left: 20px;
        font-size: 18px;
        font-weight: 500;
    }
}
</style>