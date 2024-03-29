<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref, watch} from "vue"
import {Input, Tabs, Descriptions, TabsPane, DescriptionItem} from "./test/index.tsx"
import Render from "./test/render.tsx" 
import TestSecond from "./test-second/index.vue"
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
console.log("TabsRef", TabsRef.value)
watch(inputValue, (newValue) => {
  console.log("我是新的value", newValue, InputRef.value)
})
const pageEleIns = reactive({})
setTimeout(() => {
  console.log("pageEleIns", pageEleIns)
}, 1000)
const pageConfig = {
  children: [
    {
      Components: Tabs,
      vid: "tabs-1",
      config: {
        activeKey: '2',
      },
      children: [
        {
          Components: TabsPane,
          config: {
            key: "1",
            tab: "采购信息",
          },
          children: [
            {
              Components: Descriptions,
              vid: "Description",
              config: {
                title: "退款详情",
                bordered: true,
                loadData: async(store) => {
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
                  Components: DescriptionItem,
                  config: {
                    label: "取货单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description']?.config?.data;
                      return data?.value?.code;
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "状态",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description']?.config?.data;
                      const state = {
                          '0': '关闭',
                          '1': '开放',
                      }
                      return state[data?.value?.state] || '未知';
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "销售单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description']?.config?.data;
                      return data?.value?.scode
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "子订单",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description']?.config?.data;
                      return data?.value?.ccode
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          Components: TabsPane,
          config: {
            key: "2",
            tab: "出货信息",
          },
          children: [
            {
              Components: Descriptions,
              vid: "Description-2",
              config: {
                title: "退款详情2",
                bordered: true,
                loadData: async(store) => {
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
                  Components: DescriptionItem,
                  config: {
                    label: "取货单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.code;
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "状态",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      const state = {
                          '0': '关闭',
                          '1': '开放',
                      }
                      const result =  state[data?.value?.state] || '未知';
                      if (result === "开放") {
                        return {
                          Components: 'a',
                          config: {
                            href: "http://www.baidu.com"
                          },
                          children: [
                            result,
                          ]
                        }
                      } else {
                        return result;
                      }
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "销售单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.scode
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "子订单",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.ccode
                    }
                  ]
                }
              ]
            },
            {
      Components: Tabs,
      vid: "tabs-1",
      config: {
        activeKey: '2',
      },
      children: [
        {
          Components: TabsPane,
          config: {
            key: "1",
            tab: "采购信息",
          },
          children: [
            {
              Components: Descriptions,
              vid: "Description-3",
              config: {
                title: "退款详情3",
                bordered: true,
                size: "middle",
                loadData: async(store) => {
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
                  Components: DescriptionItem,
                  config: {
                    label: "取货单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-3']?.config?.data;
                      return data?.value?.code;
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "状态",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-3']?.config?.data;
                      const state = {
                          '0': '关闭',
                          '1': '开放',
                      }
                      return state[data?.value?.state] || '未知';
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "销售单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-3']?.config?.data;
                      return data?.value?.scode
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "子订单",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-3']?.config?.data;
                      return data?.value?.ccode
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          Components: TabsPane,
          config: {
            key: "2",
            tab: "出货信息",
          },
          children: [
            {
              Components: Descriptions,
              vid: "Description-2",
              config: {
                title: "退款详情4",
                size: "small",
                bordered: true,
                loadData: async(store) => {
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
                  Components: DescriptionItem,
                  config: {
                    label: "取货单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.code;
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "状态",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      const state = {
                          '0': '关闭',
                          '1': '开放',
                      }
                      return state[data?.value?.state] || '未知';
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "销售单号",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.scode
                    }
                  ]
                },
                {
                  Components: DescriptionItem,
                  config: {
                    label: "子订单",
                  },
                  children: [
                    (store) => {
                      const data = store?.['Description-2']?.config?.data;
                      return data?.value?.ccode
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
  <router-link :to="{name: 'Table'}">
    去表格
  </router-link>
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
  <TestSecond />
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
