<template>
    <div class="header">
        <TitleAss title="用户信息" />
    </div>
</template>
<script lang="ts">
import Title from '@/components/assembly/pageTopTitle/Title.vue';
export default {
    components: {
        TitleAss: Title
    }
};
</script>
<style scoped lang="scss">
.header{
    margin: 20px 0 20px 20px;
}
</style>
