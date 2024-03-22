<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref, watch} from "vue"
import {Input, Tabs, Descriptions} from "./test/index.tsx"
import Render from "./test/render.tsx" 
import { onMounted } from 'vue';
import { reactive } from 'vue';
const inputValue = ref("呀哈哈");
const InputRef = ref(
  new Input(
    {
      placeholder: 123, 
      value: inputValue, 
      onChange: (e) => {
        console.log("我是输入框变化的值", e, InputRef.value)
      }
    }
  )
)
const TabsRef = ref(new Tabs())
watch(inputValue, (newValue) => {
  console.log("我是新的value", newValue, InputRef.value)
})
const activeKey = ref(1)
const pageEleIns = reactive({})
setTimeout(() => {
  console.log("pageEleIns", pageEleIns)
}, 1000)
const pageConfig = {
  children: [
    {
      Components: Tabs,
      vid: "tabs",
      config: {
        activeKey,
      },
      children: [
        {
          Components: 'a-tab-pane',
          config: {
            key: "1",
            tab: "采购信息",
          },
          children: [
            {
              Components: Descriptions,
              vid: "Descriptions",
              config: {
                title: "退款详情",
                bordered: true,
                loadData: async(store) => {
                  console.log("我是整个页面的store", store)
                  return {
                      code: '1000000000',
                      state: '1',
                      scode: '1234123421',
                      ccode: '3214321432'
                  }
                }
              },
              children: [
                {
                  Components: "a-descriptions-item",
                  config: {
                    label: "取货单号"
                  }
                },
                {
                  Components: "a-descriptions-item",
                  config: {
                    label: "状态"
                  },
                  children: [
                    (store) => {
                      const Descriptions = store?.['Descriptions']?.config.data;
                      console.log("Descriptions", Descriptions)
                      const state = {
                          '0': '关闭',
                          '1': '开放',
                      }
                      // return state[data.value.state] || '未知';
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]  
}
// }))
</script>

<template>
  <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      >
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <InputRef :test="12" />
  <TabsRef>
    <a-tab-pane
      key="1"
      tab="Tab 1"
      style="height: 200px"
    >
      Content of Tab Pane 1
    </a-tab-pane>
    <a-tab-pane
      key="2"
      tab="Tab 2"
      force-render
    >
      Content of Tab Pane 2
    </a-tab-pane>
    <a-tab-pane
      key="3"
      tab="Tab 3"
    >
      Content of Tab Pane 3
    </a-tab-pane>
    <template #renderTabBar="{ DefaultTabBar, ...props }">
      <component
        :is="DefaultTabBar"
        v-bind="props"
        :style="{ opacity: 0.5 }"
      />
    </template>
  </TabsRef>
  <Render
    :config="pageConfig"
    :store="pageEleIns"
  />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
