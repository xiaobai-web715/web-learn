<!--
 * @Author: ***
 * @Date: 2025-08-30 10:57:48
 * @LastEditTime: 2025-08-31 11:36:31
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \web-learn\vue-vite\src\view\debugger-snapdom.vue
 * 加油搞起来
-->
<template>
    <div class="testImage">12345</div>
    <button @click="getImage">测试页面截图</button>
    <div class="varyBig">
        <div>
            <div>5678</div>
            <div>
                <div>1234</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { snapdom } from '@zumer/snapdom';
const getImage = () => {
    const startTime = new Date().valueOf();
    snapdom
        .toCanvas(document.body, {
            performance: true, // 性能开关
            targetLevel: 10,
        })
        .then((canvas: HTMLCanvasElement) => {
            console.log('canvas', canvas);
            const endTime = new Date().valueOf();
            console.log('操作时间', endTime - startTime);
            canvas.toBlob((blob) => {
                console.log('blob', blob);
                if (blob instanceof Blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'test.png';
                    link.click();
                    URL.revokeObjectURL(url);
                }
            });
        });
};
</script>
<style lang="less" scope>
.testImage {
    width: 50px;
    height: 50px;
    background-image: url('../../test.png');
}
.varyBig {
    width: 100%;
    height: 100000px;
}
</style>
