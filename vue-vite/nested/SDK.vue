<template>
    <div class="sdk-container">
        <div class="drag-handle">
            <button class="collapse-btn" @click="handleCollapse">{{ isCollapse ? '展开' : '收起' }}</button>
            <span>企鱼通话组件</span>
        </div>
        <div class="qiyu-call-component">
            <div class="input-group">
                <label class="label">TOKEN:</label>
                <span id="qiyu-token" class="label">--</span>
                <div></div>
            </div>
            <div class="status-group">
                <span class="label">话机状态:</span>
                <span id="qiyu-status" class="label">--</span>
            </div>
            <div class="input-group">
                <label class="label">客户电话：</label>
                <input autocomplete="off" class="input" type="text" id="qiyu-phone" disabled>
            </div>
            <div class="detail-group">
                <span class="label">详细信息:</span>
                <span id="qiyu-detail" class="label">--</span>
            </div>
            <div class="button-group">
                <button id="qiyu-call" class="button green">拨打</button>
                <button id="qiyu-hangup" class="button yellow">挂断</button>
                <button id="qiyu-init" class="button red">初始化</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const isCollapse = ref(false) // false 展开状态 true 收起状态
const handleCollapse = () => {
    isCollapse.value = !isCollapse.value
}
</script>
<style scoped lang="less">
.sdk-container {
    position: fixed;
    top: 100px;
    right: 20px;
    background: #181e39;
    border-radius: 4px;
    z-index: 1000;
}
</style>
