<template>
    <div>
        <div>{{ title }}-<input v-model="count"></div>
        <button @click="increment">
            vuex测试
        </button>
        <div id="yourContainer" />
    </div>
</template>
<script lang="ts">
import { mapState, mapMutations } from 'vuex';
import { defineComponent, ComputedGetter } from 'vue';
import { start } from 'qiankun';
import './qiankun.ts';
export default defineComponent<{}, {}, {title: string}, {[key: string] : ComputedGetter<any>}, {add:(obj: {num: number}) => void, increment: () => void}>({
    data() {
        return  {
            title: 'vue'
        };
    },
    computed: {
        ...mapState<{[key: string] : number | string}>({
            count : (state:StateI):number => state.firstStore.count,
        })
    },
    mounted(){
        start();
    },
    methods: {
        // 在模块化状态的时候，可以给模块的state命名 => 但是mapMutations没有作用，还是只能保证变量名称的唯一性来获取你想要的reducer函数
        ...mapMutations({add: 'increment'}),
        increment () {
            this.$router.push('/app-vue-vite');
            this.add({
                num: 1
            });
        }
    },
});
</script>

