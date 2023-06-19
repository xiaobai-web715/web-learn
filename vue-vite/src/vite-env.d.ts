/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'format' {
  import format from 'format';
  export default format;
}

declare interface Window {
  __POWERED_BY_QIANKUN__: String
}

// declare module 'mitt'

declare module "element-plus"
