// 新增.d.ts文件在当前文件夹下,来声明方法
interface messageI {
    [key: string] : messageI | string | number
}
type webViewBridgeI =  {
    [key: string]: (<T>(message: messageI, callback?: T) => void) // 声明一个属性接收为一个方法
                                                                  // 如果这里所有的属性都是非必传的话,会有一个ts的报错警告
}
// declare的作用 定义在任何地方都可以全局去使用
type GAFieldsObject = {
    eventCategory: string;
    eventAction: string;
    eventLabel?: string;
    eventValue?: number;
    nonInteraction?: boolean;
  };
interface Window {
    ga: (
      command: 'send',
      hitType: 'event' | 'pageview',
      fieldsObject: GAFieldsObject | string,
    ) => void,
    reloadAuthorized: () => void,
    WebViewBridgeNativeEmulator: {[key: string]: any},
    webViewBridge: object
}