<template>
    <div class="header">
        <TitleAss title="用户信息" />
        <div class="useInfo">
            <div class="useInfoLeft">
                <input
                    class="upImage"
                    type="file"
                    accept="image/*"
                    @change="chooseImage"
                >
                <template v-if="!imageInfo.imageUrl">
                    <img
                        src="./img/camera.jpeg"
                        class="negative"
                    >
                    <div class="imgChooseTip">
                        选择图片
                    </div>
                </template>
                <template v-else>
                    <img
                        :src="imageInfo.imageUrl"
                        class="userImage"
                    >
                </template>
            </div>
            <div class="useInfoRight" />
        </div>
    </div>
</template>
<script lang="ts">
import {ref} from 'vue';
import { ElMessage } from 'element-plus';
import fetch from '@/http/index';
import Title from '@/components/assembly/pageTopTitle/Title.vue';
export default {
    components: {
        TitleAss: Title
    },
    setup() {
        const imageInfo = ref({
            imageFile: null,
            imageUrl: ''
        });
        return {
            imageInfo
        };
    },
    methods: {
        chooseImage(e){
            try{
                const imageBuffer = e.target.files[0];
                console.log('imageBuffer', imageBuffer);
                const url = URL.createObjectURL(imageBuffer);
                this.imageInfo.imageFile = imageBuffer;
                this.imageInfo.imageUrl = url;
                const formData = new FormData();
                // imageBuffer.baseName = encodeURI(imageBuffer.name);
                formData.append('file', imageBuffer);
                // 用FormData构造的请求默认的content-type是multipart/form-data
                fetch({
                    url: '/admin/user/userImage',
                    method: 'post',
                    params: formData
                }).then(res => {
                    console.log('res', res);
                });
            } catch(err) {
                ElMessage({
                    message: '上传失败',
                    type: 'error'
                });
            }
        }
    }
};
</script>
<style scoped lang="scss">
.header{
    margin: 20px 0 20px 20px;
    .useInfo{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .useInfoLeft{
            width: 150px;
            height: 150px;
            border: 3px solid #eee;
            position: relative;
            overflow: hidden;
            .upImage{
                width: 100%;
                height: 100%;
                opacity: 0;
                position: absolute;
                top:0;
                left:0;
                z-index: 2;
            }
            .negative{
                position: absolute;
                max-width: 60%;
                @include absoluteMiddleCenter;
                top: 40%;
            }
            .imgChooseTip{
                position: absolute;
                text-align: center;
                @include absoluteMiddleCenter;
                top: 80%;
            }
            .userImage{
                width: 100%;
                display: inline-block;
            }
        }
    }
}
</style>
