<template>
    <div class="header">
        <TitleAss title="医院科室" />
    </div>
    <div class="content"> 
        <el-form
            ref="formTarget"
            :model="formInfo"
            :inline="true"
            label-position="right"
            label-width="100px"
            :rules="rules"
        >
            <el-form-item
                label="选择医院:"
                prop="id"
            >
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
            <!-- <CascadeTree :options="parent" /> -->
            <!-- <LazyCascader :options="parent" /> -->
            <a-cascader v-model="value" />
            <div class="contentWrapper">
                <div class="sectionTree">
                    <el-tree 
                        ref="tree"
                        show-checkbox
                        node-key="id"
                        :data="sectionTree"
                        :default-checked-keys="hospHavePriv"
                    />
                </div>
            </div>
        </div>
        <div class="sure">
            <el-button
                type="primary"
                size="small"
                @click="submit"
            >
                提交
            </el-button>
        </div>
    </div>
</template>
<script>
import fetch from '@/http/index';
import { ref } from 'vue';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
import {formatSectionTree} from '@/utils/structureTree';
import { ElMessage } from 'element-plus';
export default {
    components: {
        TitleAss: Title,
    },
    setup() {
        const hospList = ref([]);
        const sectionList = ref([]);
        const formInfo = ref({
            id: ''
        });
        const sectionTree = ref([]);
        const hospHavePriv = ref([]);
        const rules = {
            id: [
                {
                    required: true, message: '请选择医院', trigger: ['blur', 'change']
                }
            ]
        };
        const parent = ref([]);
        return {
            hospList,
            formInfo,
            sectionList,
            sectionTree,
            rules,
            hospHavePriv,
            parent
        };
    },
    watch: {
        sectionList(newVal, oldVal) {
            newVal.forEach(item => item.label = item.sectionName);
            const parent = newVal.filter(routeInfo => routeInfo.ancestor == routeInfo.descendant);
            parent.forEach(item => item.value = item.id);
            console.log('parent', parent);
            this.parent = parent;
            const treeList = formatSectionTree(newVal);
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
        travelNodes(tmpRoot) {
            tmpRoot.checked = false;
            tmpRoot.indeterminate = false; //该属性是当前节点是不是被模糊选中也就是当下的子节点有没有被全选中
            console.log('我是对应的节点', tmpRoot.childNodes.length);
            if (!Array.isArray(tmpRoot.childNodes) || tmpRoot.childNodes.length == 0) {
                return ;
            } else {
                const tmpChildNodes = tmpRoot.childNodes;
                for(let i = 0; i < tmpChildNodes.length; i++) {
                    this.travelNodes(tmpChildNodes[i]);
                }
            }
        },
        hospChange(val) {
            // el-tree的default-checked-keys的默认值发生变化并不会清空当前选中并重新赋值(所以要手动清除一下)
            if (this.sectionTree[0]?.id) {
                const rootNode = this.$refs.tree.getNode(this.sectionTree[0].id).parent;
                console.log('rootNode', rootNode, this.sectionTree[0].id);
                this.travelNodes(rootNode);
                // 发起请求获取对应的医院科室信息
                fetch({
                    url: '/admin/section/getHospSection',
                    method: 'get',
                    params: {
                        hospId: Number(val)
                    },
                }).then(res => {
                    console.log('res', res);
                    if (res.code == 200) {
                        console.log('test', JSON.parse(res.data.sectionList));
                        this.hospHavePriv = JSON.parse(res.data.sectionList);
                    }
                });
            }
        },
        submit() {
            this.$refs['formTarget'].validate((pass) => {
                if (pass) {
                    const sectionHospList = this.$refs.tree.getCheckedKeys();
                     fetch({
                        url: '/admin/section/setHospSection',
                        method: 'post',
                        params: {
                            hospId: Number(this.formInfo.id),
                            sectionList: JSON.stringify(sectionHospList)
                        }
                    }).then(res => {
                        if (res.code == 200) {
                            ElMessage({
                                message: '修改成功',
                                type: 'success'
                            });
                        } else {
                            ElMessage({
                                message: '修改失败',
                                type: 'error'
                            });
                        }
                    });
                } else {
                     Promise.reject('请求失败');
                }
            });
        }
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
    .sure{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
}
</style>