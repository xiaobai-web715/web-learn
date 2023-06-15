<template>
    <div>
        <div>{{ title }}-<input v-model="count"></div>
        <button @click="increment">
            vuex测试
        </button>
        <div id="yourContainer" />
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import './qiankun.ts';
    //目前来看组合式也结合着vuex4来使用(否则和vuex有关的还是要使用选项式的写法)
    // import {getCurrentInstance} from 'vue';
    // export default {
    //   data(){
    //     return {
    //       title: 'vue'
    //     }
    //   },
    //   setup(){
    //     let {proxy} = getCurrentInstance(); //在vue3组合式与vuex的写法当中，目前查询到的方式是写成这样(说是能够在开发与生产环境当中都可以访问到)
    //     // console.log(proxy.$store.state);
    //     const increment = () => {
    //       proxy.$store.commit({
    //         type: 'increment',
    //         num : 1,
    //       })
    //     }
    //     return {
    //       count : proxy.$store.state.firstStore.count, //这里现在并不是响应式的
    //       increment,
    //     }
    //   }
    // }
    export default {
      data() {
        return  {
          title: 'vue',
        };
      },
      computed: {
        ...mapState({
          count : state => state.firstStore.count,
          // {
          //   get(state) { return state.firstStore.count},
          //   set (newValue) {
          //     console.log('newValue', newValue);
          //   }
          // },
        })
      },
      methods: {
        // 在模块化状态的时候，可以给模块的state命名 => 但是mapMutations没有作用，还是只能保证变量名称的唯一性来获取你想要的reducer函数
        ...mapMutations({add: 'increment'}),
        increment () {
          this.add({
            num: 1
          });
        }
      },
    };
</script>

