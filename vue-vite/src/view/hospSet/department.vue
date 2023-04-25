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
                    @change="hospChange"
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
            <div class="contentWrapper">
                <div class="sectionTree">
                    <el-tree 
                        show-checkbox
                        node-key="id"
                        :data="sectionTree"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import fetch from '@/http/index';
import { ref } from 'vue';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
import {formatSectionTree} from '@/utils/structureTree';
export default {
    components: {
        TitleAss: Title
    },
    setup() {
        const hospList = ref([]);
        const sectionList = ref([]);
        const formInfo = ref({
            id: ''
        });
        const sectionTree = ref([]);
        return {
            hospList,
            formInfo,
            sectionList,
            sectionTree
        };
    },
    watch: {
        sectionList(newVal, oldVal) {
            newVal.forEach(item => item.label = item.sectionName);
            const treeList = formatSectionTree(newVal);
            console.log('我是构建后的树', treeList);
            this.sectionTree = treeList;
        }
    },
    mounted() {
        const getBriefInfo = () => {
            return fetch({
                url: '/admin/hospInfo/get/briefInfo',
                method: 'post',
            });
        };
        const getSectionQuery = () => {
            return  fetch({
                url: '/admin/section/sectionList',
                method: 'get'
            });
        };
        Promise.all([getBriefInfo(), getSectionQuery()].map(v => v.catch(err => null))).then(([hospShortList, sectionList]) => {
            if (hospShortList && hospShortList.code == 200 && hospShortList.data) {
                this.hospList = hospShortList.data;
            }
            if (sectionList && sectionList.code == 200 && sectionList.data) {
                this.sectionList = sectionList.data;
            }
        });
    },
    methods: {
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
        .contentWrapper{
            margin: 30px 0 0 25px;
            border: 1px solid #999;
            border-radius: 10px;
            overflow: hidden;
            width: max-content;
            .sectionTree{
                width: 800px;
                border-radius: 10px;
                overflow-y: scroll;
                height: 400px;
                padding: 10px 0 0 15px;
            }
        }
    }
}
</style>