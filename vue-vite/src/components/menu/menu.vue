<template>
    <div
        ref="menuBox"
        class="disapper"
    >
        <div
            v-for="({children, props},index) in menus"
            :key="index"
            @click="() => {navOperate(children, props, index)}"
        >
            {{ props.title }}
            <div v-if="Array.isArray(children) && children.length > 0">
                <Menu
                    :ref="(node) => {
                        if (node) {
                            menuDom[index] = node;
                            canGetHeight[index] = false;
                        }
                    }"
                    :menus="children"
                    :can-get-height-fn="getChildInfo.bind(this, index)"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
const router = useRouter();
export default {
    props: {
        menus: {
            // 传入的菜单表
            type: Array,
            default: () => [],
        },
        canGetHeightFn: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
            router,
            menuDom: [],
            canGetHeight: [],
            menuHeight: [],
            menuOffState: true,
        };
    },
    watch: {
        canGetHeight: {
            handler(newVal, oldVal) {
                console.log('newVal', newVal);
                const result = newVal.every(item => item);
                if (result) {
                    this.canGetHeightFn();
                }
            },
            deep: true
        }
    },
    mounted() {
        console.log('menu的长度', this.menus.length , this.menus[0].children.length);
        if (this.menus.length === 1 && (this.menus[0].children?.length || []).length === 0) {
            console.log('我没有执行吗');
            this.canGetHeightFn();
        }
    },
    methods: {
        navOperate(childList, info, index) {
            if (!Array.isArray(childList) || childList.length === 0 ) {
                console.log('childList', childList, info);
                this.$router.push(info.filePath);
            } else {
                // 如果不是跳转路由的话就要进行导航的开启与关闭功能了
                const dom = this.menuDom[index].$refs['menuBox'];
                if (this.menuOffState) {
                    console.log('最下一级应该我执行');
                    dom.style.height = this.menuHeight[index] + 'px';
                    setTimeout(() => {
                        dom.style.height = 'auto';
                    }, 1);
                } else {
                    // 先获取当前dom元素的实际高度,然后进行加载
                    console.log('最下一级我却执行了');
                    const heightReal = dom.clientHeight;
                    console.log('heightReal', heightReal, [dom]);
                    dom.style.height = heightReal + 'px';
                    setTimeout(() => {
                        dom.style.height = 0;
                    }, 1);
                }
                this.menuOffState = !this.menuOffState;
            }
        },
        getChildInfo(index) {
            console.log('index', index);
            this.canGetHeight[index] = true;
            this.menuHeight[index] = this.menuDom[index].$refs['menuBox'].clientHeight;
            this.menuDom[index].$refs['menuBox'].style.height = 0; //能够获取高度的元素在获取高度之后进行关闭
        }
    }
};
</script>
<style lang="scss" scoped>
.disapper{
    overflow: hidden;
    transition: height 1s;
}
</style>