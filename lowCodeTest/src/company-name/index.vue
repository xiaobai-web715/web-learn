<template>
    <div>
        <div class="red-text" @click="changeValue">【名单客户】</div>
        <div>北京海洋科技有限控死北京海洋科技有限控死</div>
        <e-tag color="success">近15天新增10岗位</e-tag>
        <e-tag color="error">营业正常</e-tag>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
export interface EllipsisTextProps {
    instance: any
}
const props = defineProps<EllipsisTextProps>()

const changeValue = () => {
    props.instance.getConfig().dataSource = props.instance.getConfig().dataSource.map((item) => {
        item.isEdit = true;
        return item;
    })
}
</script>
<style scoped>
.red-text {
    color: #ff4d4f;
}
</style>
