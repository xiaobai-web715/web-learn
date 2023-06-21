// declare module '*.css';
// declare module '*.less';
// declare module '*.scss';
// declare module '*.sass';
// declare module '*.svg';
// declare module '*.png';
// declare module '*.jpg';
// declare module '*.jpeg';
// declare module '*.gif';

declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

// google analytics interface
type GAFieldsObject = {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
};

interface messageI {
  [key: string] : messageI | string | number
}
type webViewBridgeI =  {
  [key: string]: (<T>(message: messageI, callback?: T) => void) // 声明一个属性接收为一个方法
                                                                // 如果这里所有的属性都是非必传的话,会有一个ts的报错警告
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void,
  reloadAuthorized: () => void,
  __POWERED_BY_QIANKUN__: string,
  WebViewBridgeNativeEmulator: {[key: string]: any},
  webViewBridge: object
};

declare let ga: () => void;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

interface IList {
  url: string;
  title: string;
}
interface ICssProps {
  list: Array<IList>;
}