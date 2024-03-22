declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
  declare module 'vue' {
    export interface GlobalComponents {
      AInput: typeof import('ant-design-vue')['Input']
    }
  }
  
  export {};