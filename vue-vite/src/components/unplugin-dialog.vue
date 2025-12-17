<template>
    <a-modal :visible="props.visible" @cancel="closeDialog"> unplugin-dialog </a-modal>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{ visible: boolean }>(), {
    visible: false,
});
const emits = defineEmits<{
    (e: 'update:visible'): void;
}>();
const closeDialog = () => {
    emits('update:visible');
};
</script>
