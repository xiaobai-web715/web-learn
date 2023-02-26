<template>
    <!-- 当前的菜单组件还有一个致命的问题就是定时器来处理height会导致快速点击菜单出现展开与缩回的 -->
    <!-- 目前的处理方式是通过试验何时的定时时长来进行避免 -->
    <div
        ref="menuBox"
        class="disapper"
    >
        <div
            v-for="({children, props},index) in menus"
            :key="index"
            :class="'baseStyle ' + props.className"
            @click.stop="() => {navOperate(children, props, index)}"
        >
            <div class="title">
                {{ props.title }}
            </div>
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
        // if (this.menus.length === 1 && (this.menus[0].children?.length || []).length === 0) {
        //     console.log('我没有执行吗');
        //     this.canGetHeightFn();
        // }
        // 这里的铺【判断逻辑修改一下（最底层的判断应该是我传入的menus列表中得每一个都没有children了）
        const result = this.menus.every(item => (item.children || []).length === 0);
        if (result) {
            this.canGetHeightFn();
        }
    },
    methods: {
        navOperate(childList, info, index) {
            console.log('我执行了两边');
            if (!Array.isArray(childList) || childList.length === 0 ) {
                console.log('childList', childList, info);
                this.$router.push(info.filePath);
            } else {
                const dom = this.menuDom[index].$refs['menuBox'];
                if (this.menuOffState) {
                    dom.style.height = this.menuHeight[index] + 'px';
                    setTimeout(() => {
                        dom.style.height = 'auto';
                    }, 500);
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
    background-color: #545c64;
    .baseStyle{
        color: #fff;
    }
}
</style>