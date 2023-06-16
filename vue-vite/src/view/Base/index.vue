<template>
    <div>
        <MyHeaderVue />
        <MyFotterVue />
        <div class="pageContent">
            <MySideBarVue class="fixed" />
            <!-- 嵌套的子路由需要在父路由加载的组件当中也添加router-view才能成功显示子路由 -->
            <div class="page">
                <!-- <router-view /> -->
                <!-- keepAlie缓存好像有可能会导致首屏数据加载不出来 -->
                <router-view
                    v-slot="{Component}"
                >
                    <keep-alive>
                        <component
                            :is="Component"
                        />
                    </keep-alive>
                </router-view>
            </div>
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
  .fixed{
    flex-grow: 0;
    flex-shrink: 0;
  }
  .page{
    flex-grow: 1;
  }
}
</style>