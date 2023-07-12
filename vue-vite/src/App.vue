<template>
    <router-view />
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import eventBus from "@/utils/eventBus/index.js";
export default {
    mounted() {
        console.log('axiosProps', '写入');
        eventBus.$emit('axiosProps', useRouter());
    }
};
</script>
<style lang="scss">
</style>
