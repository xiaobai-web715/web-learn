<template>
    <div class="cascade">
        <div class="cascadeInput">
            <el-input
                @click="pullDown"
            />
        </div>
        <div class="cascadeBody">
            <div class="cascadingContent">
                <div
                    v-for="(item, index) in nodeList"
                    :key="index"
                    class="label"
                >
                    {{ item.data.label }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            nodeList: []
        };
    },
    mounted(){
        this.nodeList = this.options.map(item => {
            return {
                checked: false, // 先暂时按照默认值false进行处理
                data: item
            };
        });
        console.log('this.nodeList', this.nodeList, this.options);
    },
    methods: {
        pullDown() {
            console.log('点击事件');
        }
    }
};
</script>
<style lang="scss">
.cascade{
    position: relative;
    .cascadeInput{
        width: 300px;
    }
    .cascadeBody{
        position: absolute;
        .cascadingContent{
            height: 100px;
            overflow: scroll;
        }
    }
}
</style>