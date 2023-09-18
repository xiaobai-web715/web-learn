<template>
    <div class="loginPage">
        <div class="useLogin">
            用户登录
        </div>
        <form class="loginForm">
            <label for="user">用户名:</label>
            <input
                id="user"
                v-model="formData.user"
            ><br>
            <label for="password">密码:</label>
            <input
                id="password"
                v-model="formData.password"
                type="password"
            >
        </form>
        <div class="buttons">
            <button
                @click="submit"
            >
                登录
            </button>
            <button @click="register">
                注册
            </button>
        </div>
        <div class="scrollModel">
            <div class="testModel">
                <div v-if="testSlidingModule.oriImageUrl" class="oriImage" :style="{backgroundImage: `url(${testSlidingModule.oriImageUrl})`, width: `${oriImageInfo?.width}px`, height: `${oriImageInfo?.height}px`}">
                    <div v-if="testSlidingModule.newImageUrl" class="newImage" :style="{backgroundImage: `url(${testSlidingModule.newImageUrl})`, width: `${newImageInfo?.width + 2 * newImageInfo?.radius}px`, height: `${newImageInfo?.height + 2 * newImageInfo?.radius}px`, top: `${topPercent * 100}%`, left: `${moveDistance}px`}"></div>
                </div>
                <div class="scrollContent">
                    <div class="scroll" ref="scrollDom" :style="{left: moveDistance + 'px'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
// setup模式下可以在export default{}使用useRouter以及useStore生成全局变量,但组合式情况下不生效
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import request from '@/http/index.js';
import {useStore} from 'vuex';
import {SET_AUTH, SET_USER, SET_ID, GET_IP} from '@/store/actionsTypes';
import {loginInfos} from './enums.js';
import { ElMessage } from 'element-plus';
import {getBase64ToBLob} from '@/utils/baseToBolb.js'
export default {
    setup() {
        const router = useRouter();
        const store = useStore();
        const formData = ref({
            user:'',
            password:'',
        });
        const downPageX = ref(0);
        const testSlidingModule = ref({
            oriImageUrl: '',
            newImageUrl: ''
        });
        const newImageInfo = ref({
            width: 0,
            height: 0,
            radius: 0,
        });
        const oriImageInfo = ref({
            width: 0,
            height: 0,
            radius: 0,
        });
        const topPercent = ref(0)
        const moveDistance = ref(0);
        return {
            formData,
            router,
            store,
            testSlidingModule,
            newImageInfo,
            oriImageInfo,
            topPercent,
            moveDistance,
            downPageX
        };
    },
    mounted() {
        this.store.dispatch(GET_IP).then(res => {
            console.log('我是本机的ip信息', res);
        })
        request({
            url: '/admin/user/getLoginVer',
            method: 'post',
            params: {userName: '你说啥名字好呢'}
        }).then(res => {
            if (res && res.code == 200) {
                const {baseImage, newImage, oriImage, y} = res.data;
                const base64InfoList = baseImage.split('#');
                const imageObj = {};
                base64InfoList.forEach(item => {
                    const [name, value] = item.split('&')
                    imageObj[name] = value;
                })
                const oriImageUrlBlob = getBase64ToBLob(imageObj['oriImage'], 'image/png')
                const oriImageUrl = URL.createObjectURL(oriImageUrlBlob)
                const newImageUrlBlob = getBase64ToBLob(imageObj['newImage'], 'image/png')
                const newImageUrl = URL.createObjectURL(newImageUrlBlob)
                this.testSlidingModule.oriImageUrl = oriImageUrl;
                this.testSlidingModule.newImageUrl = newImageUrl;
                this.newImageInfo = newImage;
                this.oriImageInfo = oriImage;
                const canvasHeight = oriImage.height;
                const canvasWidth = oriImage.width;
                const topPercent = (y - newImage.radius) / canvasHeight;
                const leftPercent = newImage.radius / canvasWidth;
                this.leftPercent = leftPercent;
                this.topPercent = topPercent;
                console.log('oriImageUrl', oriImageUrl, this.testSlidingModule, topPercent);
            }
        })
        console.log('this.$refs[]', this.$refs['scrollDom']);
        this.$refs['scrollDom'].addEventListener('mousedown', this.mouseDown.bind(this))
        this.$refs['scrollDom'].addEventListener('mouseup', this.mouseUp.bind(this))
    },
    methods: {
        submit() {
            request({
                url: '/admin/user/login',
                method: 'post',
                params: this.formData
            }).then(res => {
                console.log('res', res);
                if (res.code === 200) {
                    const {token, username, id} = res.data;
                    this.store.dispatch(SET_AUTH, {token: token});
                    this.store.dispatch(SET_USER, {user: username});
                    this.store.dispatch(SET_ID, {id: id});
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('user', username);
                    sessionStorage.setItem('id', id);
                    this.router.push('/');
                } else {
                    const code = res.code;
                    const message = loginInfos.find(item => item.code == code)?.message;
                    ElMessage({
                        message: message,
                        type: 'error'
                    });
                }
            });
        },
        register() {
            console.log('触发注册功能');
            this.router.push('/register');
        },
        mouseMove(e) {
            const currentPageX = e.pageX; //鼠标移动时的pageX
            const moveDistance = currentPageX - this.downPageX;
            this.moveDistance = moveDistance
            console.log('我是鼠标移动事件', e, this.downPageX)
        },
        mouseDown(e) {
            console.log('鼠标按下事件', e);
            const downPageX = e.pageX; //鼠标按下时的pageX
            this.downPageX = downPageX;
            //对鼠标移动事件进行绑定
            e.target.addEventListener('mousemove', this.mouseMove)
        },
        mouseUp(e) {
            console.log('鼠标弹起事件', e);
            e.target.removeEventListener('mousemove', this.mouseMove)
            //触发接口调用传递x轴移动的距离
            request({
                url: '/admin/user/slide/distance',
                method: 'post',
                params: {
                    x: this.moveDistance
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.loginPage{
    @include fixedCenter;
    height: 250px;
    .useLogin{
        text-align: center;
        margin-bottom: 30px;
    }
    .loginForm{
        display: inline-block;
        label{
            margin-right: 10px;
            width: 60px;
            display: inline-block;
            text-align: right;
        }
        input{
            display: inline-block;
            width: 200px;
            height: 30px;
            outline: none;
            margin-bottom: 15px;
        }
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        button{
            display: block;
            width: 60px;
            height: 40px;
            border: none;
            border-radius: 10px;
            &:nth-child(1) {
                margin-right: 20px;
                background-color: #5A88FB;
                color: #FFF;
            }
        }
    }
    .scrollModel{
        .testModel{
            .oriImage{
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: relative;
            }
            .newImage{
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: absolute;
            }
        }
        .scrollContent{
            width: 100%;
            height: 25px;
            background-color: #eee;
            position: relative;
            .scroll{
                position: absolute;
                top: 0;
                left: 0;
                width: 40px;
                height: 100%;
                background-color: #5A88FB;
            }
        }
    }
}
</style>