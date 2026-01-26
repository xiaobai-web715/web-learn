import { ChromeEventType } from "root/types"
const haveProxyXHR = Symbol.for('haveProxyXHR')
// @ts-ignore
if (window[haveProxyXHR]) {
} else {
    const OriginlXHR = window.XMLHttpRequest
    function myXHR() {
        const xhr = new OriginlXHR()
        xhr.addEventListener('readystatechange', function (e: Event) {
            if (this.readyState === 4) {
                window.postMessage({
                    type: ChromeEventType.GETRequestURL,
                    data: {
                        url: this.responseURL,
                    }
                })
            }
        })
        return xhr
    }
    
    // Reflect.ownKeys返回所有自有属性包括不可枚举的和Symbol的
    Reflect.ownKeys(window.XMLHttpRequest).forEach(key => {
        // Object.defineProperty 设置对象属性的数据属性和访问器属性
        Object.defineProperty(myXHR, key, Object.getOwnPropertyDescriptor(window.XMLHttpRequest, key) as PropertyDescriptor)
        // Object.getOwnPropertyDescriptor 获取对象属性的数据属性值和访问器属性值
    })
    
    window.XMLHttpRequest = myXHR as any
    
    // @ts-ignore
    window[haveProxyXHR] = true
}