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
                <template v-if="!imageUrl && !imageInfo.imageUrl">
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
                        :src="imageUrl"
                        class="userImage"
                    >
                </template>
            </div>
            <div class="useInfoRight" />
        </div>
    </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import fetch from "@/http/index.js";
import Title from "@/components/assembly/pageTopTitle/Title.vue";
export default {
  components: {
    TitleAss: Title,
  },
  setup() {
    const imageInfo = ref<{ imageFile: File | null; imageUrl: string }>({
      imageFile: null,
      imageUrl: "",
    });
    const imageUrl = ref<string>("");
    return {
      imageInfo,
      imageUrl,
    };
  },
  mounted() {
    const uid = window.sessionStorage.getItem("id");
    fetch({
      url: "/admin/user/getUserImage",
      method: "post",
      params: { uid: Number(uid) },

    }).then((res) => {
      // console.log('res', res);
      // 后端application/octet-stream返回流的形式目前不清楚如何携带code值,暂时以Blob转化后的size长度来判断
      if (res.size) {
        const url = URL.createObjectURL(res);
        // console.log('url', url);
        this.imageUrl = url;
      }
    });
  },
  methods: {
    chooseImage(e: Event) {
      try {
        const dom = <HTMLInputElement>e.target;
        const imageBuffer = (<FileList>dom.files)[0];
        const url = URL.createObjectURL(imageBuffer);
        this.imageInfo.imageFile = imageBuffer;
        this.imageInfo.imageUrl = url;
        const formData = new FormData();
        formData.append("file", imageBuffer);
        formData.append("uid", sessionStorage.getItem("id") || "");
        // 用FormData构造的请求默认的content-type是multipart/form-data
        // url: 'http://127.0.0.1:8201/admin/hosp/user/uploadImage', 跳过node层直接请求
        fetch({
          url: "/admin/user/userImage",
          method: "post",
          params: formData,
        }).then((res) => {
          if (res.code == 200) {
            ElMessage({
              message: "上传成功",
              type: "success",
            });
          }
        });
      } catch (err) {
        ElMessage({
          message: "上传失败",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.header {
  margin: 20px 0 20px 20px;

  .useInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .useInfoLeft {
      width: 150px;
      height: 150px;
      border: 3px solid #eee;
      position: relative;
      overflow: hidden;

      .upImage {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }

      .negative {
        position: absolute;
        max-width: 60%;
        @include absoluteMiddleCenter;
        top: 40%;
      }

      .imgChooseTip {
        position: absolute;
        text-align: center;
        @include absoluteMiddleCenter;
        top: 80%;
      }

      .userImage {
        width: 100%;
        display: inline-block;
      }
    }
  }
}
</style>
