<template>
    <div v-for="(item, index) in list">
        <input type="checkbox"/>
        <img :src="item.url"/>
    </div>
    <button @click="deleteList">删除</button>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import camera from "./img/camera.jpeg"
import commun from "./img/communicate-8.png"
import test from "./img/test.png"
const list = ref([
    {
        url: camera,
    },
    {
        url: commun,
    },
    {
        url: test
    }
])
const deleteList = () => {
    list.value = list.value.filter((item, index) =>  index !== 1)
}
</script>