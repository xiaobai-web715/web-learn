<template>
  <div
    ref="antProTableRef"
    class="edy-table-container"
    :class="{
      'edy-table-fullscreen': tableSetting.isFullscreen,
    }"
  >
    <div
      class="edy-grid-content"
      :style="{
        padding: '24px',
        'min-height': tableSetting.isFullscreen ? '100%' : 'auto',
      }"
    >
      <div
        v-if="!hiddenSetting"
        class="edy-table-action"
      >
        <div class="edy-table-action-left">
          <e-alert
            class="edy-table-alert"
            show-icon
            :style="{ visibility: selectedRows.length ? 'visible' : 'hidden' }"
          >
            <template #message>
              <div class="edy-table-alert-message">
                <SelectedTipComp
                  v-if="!tableSetting.selectedTipsComp"
                  :selected-length="selectedRows.length"
                />
                <component
                  :is="tableSetting.selectedTipsComp"
                  v-else
                  :instance="props.instance"
                />
                <span :style="{ opacity: selectedRows.length === 0 ? 0.65 : 1 }">
                  <component
                    :is="tableSetting.alert"
                    v-if="tableSetting.alert"
                    :instance="props.instance"
                  />
                </span>
              </div>
            </template>
          </e-alert>
          <component
            :is="tableSetting.operate"
            v-if="tableSetting.operate"
            :instance="props.instance"
          />
        </div>
        <div
          v-if="!hiddenSetting"
          class="edy-table-setting"
        >
          <e-space :size="16">
            <div
              v-if="customSlotNameList.includes('operate')"
              class="edy-table-setting-item"
            >
              <e-divider
                type="vertical"
                style="margin: 0"
              />
            </div>
            <div class="edy-table-setting-item">
              <e-dropdown
                :trigger="['click']"
                :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
              >
                <template #overlay>
                  <e-menu
                    :selected-keys="tableSetting.sizeSelectedKeys"
                    @click="tableSizeChange"
                  >
                    <e-menu-item key="default">
                      <a
                        href="javascript:;"
                        style="display: block; width: 56px"
                      > 默认 </a>
                    </e-menu-item>
                    <e-menu-item key="middle">
                      <a
                        href="javascript:;"
                        style="display: block; width: 56px"
                      > 中等 </a>
                    </e-menu-item>
                    <e-menu-item key="small">
                      <a
                        href="javascript:;"
                        style="display: block; width: 56px"
                      > 紧凑 </a>
                    </e-menu-item>
                  </e-menu>
                </template>
                <e-tooltip
                  title="密度"
                  :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
                >
                  <ColumnHeightOutlined class="edy-table-setting-icon" />
                </e-tooltip>
              </e-dropdown>
            </div>
            <div class="edy-table-setting-item">
              <e-tooltip
                title="全屏"
                :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
              >
                <FullscreenExitOutlined
                  v-if="tableSetting.isFullscreen"
                  class="edy-table-setting-icon"
                  @click="toggleFullscreen(false)"
                />
                <FullscreenOutlined
                  v-else
                  class="edy-table-setting-icon"
                  @click="toggleFullscreen(true)"
                />
              </e-tooltip>
            </div>
            <div class="edy-table-setting-item">
              <e-tooltip
                title="刷新"
                :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
              >
                <ReloadOutlined
                  class="edy-table-setting-icon"
                  @click="refresh(false)"
                />
              </e-tooltip>
            </div>
            <div class="edy-table-setting-item">
              <e-popover
                placement="topLeft"
                trigger="click"
              >
                <template #title>
                  <div style="display: flex; justify-content: space-between">
                    <e-checkbox
                      :checked="tableSetting.checkAll"
                      :indeterminate="tableSetting.indeterminate"
                      @change="(e: any) => tableColumnsCheckChange(e)"
                    >
                      列展示/排序
                    </e-checkbox>
                    <a @click="resetTableColumns">重置</a>
                  </div>
                </template>
                <template #content>
                  <div class="edy-table-column-setting-list">
                    <template v-for="(columnItem, key) in tableSettingColumns">
                      <div
                        v-if="columnItem.fixed === 'left'"
                        :key="key"
                        class="edy-table-column-setting-list-items"
                      >
                        <DragOutlined
                          class="not-drag"
                          :style="{
                            'margin-right': '8px',
                            cursor: 'no-drop',
                          }"
                        />
                        <e-checkbox
                          :checked="columnItem.isShow"
                          @change="(e: any) => tableSettingColumnChange(e, columnItem)"
                        >
                          {{ columnItem.title }}
                        </e-checkbox>
                      </div>
                    </template>
                    <Container
                      orientation="vertical"
                      non-drag-area-selector=".not-drag"
                      @drop="handleColumnDrop"
                    >
                      <Draggable
                        v-for="columnItem in tableSettingColumns"
                        :key="columnItem.key"
                      >
                        <div
                          v-if="!columnItem.fixed"
                          class="edy-table-column-setting-list-items"
                        >
                          <DragOutlined
                            :style="{
                              'margin-right': '8px',
                              cursor: 'move',
                            }"
                          />
                          <e-checkbox
                            :checked="columnItem.isShow"
                            @change="(e: any) => tableSettingColumnChange(e, columnItem)"
                          >
                            {{ columnItem.title }}
                          </e-checkbox>
                        </div>
                      </Draggable>
                    </Container>
                    <template v-for="columnItem in tableSettingColumns">
                      <div
                        v-if="columnItem.fixed === 'right'"
                        class="edy-table-column-setting-list-items"
                      >
                        <DragOutlined
                          class="not-drag"
                          :style="{
                            'margin-right': '8px',
                            cursor: 'no-drop',
                          }"
                        />
                        <e-checkbox
                          :checked="columnItem.isShow"
                          @change="(e: any) => tableSettingColumnChange(e, columnItem)"
                        >
                          {{ columnItem.title }}
                        </e-checkbox>
                      </div>
                    </template>
                  </div>
                </template>
                <e-tooltip
                  title="列设置"
                  :get-popup-container="(triggerNode: any) => triggerNode.parentNode"
                >
                  <SettingOutlined class="edy-table-setting-icon" />
                </e-tooltip>
              </e-popover>
            </div>
          </e-space>
        </div>
      </div>
      <a-table
        v-if="instance"
        v-bind="{...tableConfig, columns: realColums}"
      />
      {{ slots.headerCell }}
    </div>
  </div>
</template>

<script setup lang="ts">
import cloneDeep from "lodash-es/cloneDeep"
import Sortable from "sortablejs"
import { Container, Draggable } from "vue3-smooth-dnd"
import { useToggle, useFullscreen, useEventListener } from "@vueuse/core"
import { useAttrs, useSlots, unref, watch, ref, toRef, computed, reactive, defineComponent, onMounted } from "vue"
import {
    ColumnHeightOutlined,
    DragOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    ReloadOutlined,
    SettingOutlined,
} from "@ant-design/icons-vue"
import type { TablePaginationConfig, TableProps } from "ant-design-vue-v2"
import SelectedTipComp from './select-tips.vue';

export interface EdyTableProps {
    instance?: any
}

const props = withDefaults(defineProps<EdyTableProps>(), {})

const tableConfig: any = computed(() => props.instance.getConfig())
const columns = tableConfig.value.columns
const realColums = computed(() => tableSettingColumns.value.filter(item => item.isShow))
const selectedRows = computed(() => props.instance.selectedRows || [])

onMounted(() => {
    console.log("我是instance", props.instance)
    props.instance.setConfigByKey('size', 'small');
})

/**
 * 插槽逻辑处理
*/
const slots = useSlots()
const customSlotNameList = computed<string[]>(() =>
    Object.keys(slots).filter((name) => ["alert", "operate"].includes(name)),
)
console.log("我是传递进来的props", props, slots)
/**
 * 右上角设置相关逻辑
*/
const defaultTableSetting = {
    isFullscreen: false, // 是否全屏
    hiddenSetting: false, // 隐层设置选项

    sizeSelectedKeys: ['small'], // 选中的尺寸

    checkAll: true, // 是否全选
    indeterminate: false, // 全选样式控制
};
const tableSetting = reactive({...defaultTableSetting, ...props.instance.headerSettings})
/**
 * 表格尺寸设置
*/
function tableSizeChange(obj: any) {
    props.instance.setConfigByKey('size', obj.key);
    tableSetting.sizeSelectedKeys = [obj.key]
}
/**
 * 全屏
*/
const antProTableRef = ref<HTMLElement | null>(null)
const { toggle: toggleFullscreenStatus } = useFullscreen(antProTableRef, {
    autoExit: true,
})
function toggleFullscreen(bool: boolean) {
    toggleFullscreenStatus()
    tableSetting.isFullscreen = bool
}

/**
 * 排序操作
*/
const tableSettingColumns = ref(rebuildTableColumns(columns))
const defaultColumns = cloneDeep(rebuildTableColumns(columns))

function tableColumnsCheckChange(e: any) {
    tableSetting.checkAll = e.target.checked
    tableSetting.indeterminate = false
    tableSettingColumns.value = defaultColumns.map((columnItem) => {
        return {
            ...columnItem,
            isShow: tableSetting.checkAll,
        }
    })
}
function rebuildTableColumns(columns: any[]): any[] {
    return (columns ?? []).map((columnItem) => {
        let isShow = true
        if (typeof columnItem.isShow === "undefined") {
            isShow = true
        } else {
            isShow = columnItem.isShow
        }
        return {
            ...columnItem,
            isShow,
        }
    })
}
function tableSettingColumnChange(e: any, column: any) {
    column.isShow = e.target.checked
    const checkedLength = tableSettingColumns.value.filter((columnItem) => columnItem.isShow).length
    tableSetting.checkAll = checkedLength === defaultColumns.length
    tableSetting.indeterminate = !!checkedLength && checkedLength < defaultColumns.length
}
function tableColumnsApplyDrag(arr: any[], dragResult: any) {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]
    let itemToAdd = payload
    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }
    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }
    return result
}
function handleColumnDrop(dragResult: any) {
    tableSettingColumns.value = tableColumnsApplyDrag(tableSettingColumns.value, dragResult)
}
function resetTableColumns() {
    tableSetting.checkAll = true
    tableSetting.indeterminate = false
    tableSettingColumns.value = cloneDeep(defaultColumns)
}

/**
 * 刷新数据
*/
function refresh(bool: boolean = false) {
    props.instance.refreshData();
}



</script>

<style scoped lang="less">
.edy-table-container {
    &.edy-table-fullscreen {
        overflow: auto;
    }
    .edy-grid-content {
        padding: 24px;
        background-color: #fff;
    }
    .edy-table-action {
        display: flex;
        margin-bottom: 8px;
        align-items: center;
        gap: 8px;
        &-left {
            flex: 1;
            display: flex;
            gap: 8px;
        }
    }
    .edy-table-alert {
        flex: 1;
        &-message {
            display: flex;
            justify-content: space-between;
            :deep(.ant-btn-link) {
                height: auto;
                padding: 0;
                line-height: 1;
                &::before {
                    background-color: transparent;
                }
            }
        }
    }
    .edy-table-setting {
        &-icon {
            font-size: 16px;
        }
    }
    .edy-table-column-setting-list {
        max-height: 300px;
        min-width: 180px;
        overflow-y: auto;
        &-item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 4px 16px 4px 0;
            .ant-checkbox-wrapper {
                flex: 1;
            }
        }
    }
}
.not-drag {
    opacity: 0.3;
}
</style>
