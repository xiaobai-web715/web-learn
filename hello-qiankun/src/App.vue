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
import { start } from 'qiankun';
import './qiankun.ts';
export default {
    data() {
        return  {
            title: 'vue',
        };
    },
    computed: {
        ...mapState({
            count : state => state.firstStore.count,
        })
    },
    mounted(){
        start();
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

