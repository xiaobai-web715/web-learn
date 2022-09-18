<template>
    <header class="my-page">
        <router-view />
    </header>
</template>
<style scoped lang="scss">
    .my-page {
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        padding: 90px 30px 90px 280px;
        box-sizing: border-box; 
    }
</style>