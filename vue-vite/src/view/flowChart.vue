<template>
    <div class="flowChart" ref="canvas">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'
import BpmnViewer from 'bpmn-js'
import { onMounted } from 'vue'
import { onBeforeMount } from 'vue'
const canvas = ref()
let viewer;
const resizeHandler = _.debounce(() => {
    console.log('resizeHandler', '页面resize')
    if (viewer) {
        viewer.get('canvas').zoom('fit-viewport');
    }
}, 500)
onMounted(async () => {
    window.addEventListener('resize', resizeHandler);
    viewer = new BpmnViewer({
        container: canvas.value
    })
    const response = await fetch('/test.xml');
    const xmlTest = await response.text();
    console.log('xmlTest', xmlTest)
    viewer.importXML(
        xmlTest
    ).then((result) => {
        const { warnings } = result;
        console.log('success !', warnings);
        resizeHandler()
    }).catch(function (err) {
        const { warnings, message } = err;
        console.log('something went wrong:', warnings, message);
    });
})
onBeforeMount(() => {
    window.removeEventListener('resize', resizeHandler);
})
</script>
<style lang="less" scoped>
.flowChart {
    background-color: #ffffff;
    width: 100%;
    height: calc(100% - 52px);
    padding: 15px;
}

.djs-outline {
    display: none !important;
}
</style>