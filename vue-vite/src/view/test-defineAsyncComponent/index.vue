<template>
    <a-button @click="openModal">打开弹窗</a-button>
    <Modal v-model:visible="visible" v-if="modalLoaded"></Modal>
</template>
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue';
const visible = ref<boolean>(false);
const modalLoaded = ref<boolean>(false);
const Modal = defineAsyncComponent(() => import('./dialog.vue'));
const openModal = () => {
    visible.value = true;
    modalLoaded.value = true;
};
</script>
