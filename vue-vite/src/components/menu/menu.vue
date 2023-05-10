<template>
    <!-- 当前的菜单组件还有一个致命的问题就是定时器来处理height会导致快速点击菜单出现展开与缩回的 -->
    <!-- 目前的处理方式是通过试验何时的定时时长来进行避免 -->
    <div
        ref="menuBox"
        class="disapper"
    >
        <div
            v-for="({children = [], props = {}, name},index) in menus"
            :key="index"
            :class="'baseStyle ' + props.className"
            @click.stop="() => {navOperate(children, name, index)}"
        >
            <template v-if="!props.hidden">
                <div class="title menu_icon">
                    <div
                        v-if="children.length > 0 && iconList[index]"
                        class="icon"
                    >
                        <Icon :icon-name="iconList[index]" />
                    </div>
                    {{ props.title }}
                    <div
                        v-if="children.length > 0"
                        class="iconRight"
                    >
                        <!-- <ArrowUp v-if="menuOpen" />
                        <ArrowDown v-else /> -->
                        <Icon :icon-name="menuOpen ? 'ArrowUp' : 'ArrowDown'" />
                    </div>
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
            </template>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';
import Icon from '@/components/jsx/icon.jsx';
// import { ElementPlus, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
const router = useRouter();
export default {
    components: {
        Icon
    },
    props: {
        menus: {
            // 传入的菜单表
            type: Array,
            default: () => [],
        },
        canGetHeightFn: {
            type: Function,
            default: () => {}
        },
        iconList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        console.log('iconList', this.iconList);
        return {
            router,
            menuDom: [],
            canGetHeight: [],
            menuHeight: [],
            menuOffState: true,
            menuOpen: false
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
        // 这里的铺【判断逻辑修改一下（最底层的判断应该是我传入的menus列表中得每一个都没有children了）
        const result = this.menus.every(item => (item.children || []).length === 0);
        if (result) {
            this.canGetHeightFn();
        }
    },
    methods: {
        navOperate(childList, name, index) {
            if (!Array.isArray(childList) || childList.length === 0 ) {
                // this.$router.push(info.filePath);
                this.$router.push({name});
            } else {
                const dom = this.menuDom[index].$refs['menuBox'];
                if (this.menuOffState) {
                    // 变为打开状态
                    dom.style.height = this.menuHeight[index] + 'px';
                    this.menuOpen = true;
                    setTimeout(() => {
                        dom.style.height = 'auto';
                    }, 500);
                } else {
                    // 先获取当前dom元素的实际高度,然后进行加载 变为关闭状态
                    const heightReal = dom.clientHeight;
                    dom.style.height = heightReal + 'px';
                    this.menuOpen = false;
                    setTimeout(() => {
                        dom.style.height = 0;
                    }, 1);
                }
                this.menuOffState = !this.menuOffState;
            }
        },
        getChildInfo(index) {
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
        transition: height 0.5s;
        // background-color: #545c64;
        .baseStyle{
            color: #fff;
            .menu_icon{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .icon{
                    width: 15px;
                    height: 15px;
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                }
                .iconRight{
                    width: 18px;
                    height: 18px;
                    display: flex;
                    align-items: center;
                    margin-left: 25px;
                }
            }
        }
    }
</style>