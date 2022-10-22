<template>
    <div>
        <MyHeaderVue />
        <MyFotterVue />
        <div class="pageContent">
            <MySideBarVue />
            <!-- 嵌套的子路由需要在父路由加载的组件当中也添加router-view才能成功显示子路由 -->
            <router-view />
        </div>
    </div>
</template>
<script setup lang="ts">
  import MyHeaderVue from './MyHeader.vue';
  import MyFotterVue from './MyFotter.vue';
  import MySideBarVue from './MySideBar.vue';
</script>
<style scoped lang="scss">
.pageContent{
  margin-top:60px;
  display:flex;
  justify-content: flex-start;
  min-height: 100vh;
}
</style>