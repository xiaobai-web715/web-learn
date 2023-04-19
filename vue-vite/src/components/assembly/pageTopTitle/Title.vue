<template>
    <div class="title custom">
        {{ title }}
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>
<style scoped lang="scss">
    .title{
        border-right:5px solid rgb(26, 156, 221);
        font-size:20px;
        display: flex;
        align-items: center;
        width: max-content;
        padding-right: 15px;
        height: 32px;
    }
</style>
