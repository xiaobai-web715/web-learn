<template>
  <div>{{title}}-{{count}}</div>
</template>
<script>
    //目前来看组合式也结合着vuex4来使用(否则和vuex有关的还是要使用选项式的写法)
    import {getCurrentInstance} from 'vue';
    export default {
      data(){
        return {
          title: 'vue'
        }
      },
      setup(){
        let {proxy} = getCurrentInstance(); //在vue3组合式与vuex的写法当中，目前查询到的方式是写成这样(说是能够在开发与生产环境当中都可以访问到)
        // console.log(proxy.$store.state);
        return {
          count : proxy.$store.state.count,
        }
      }
    }
</script>

