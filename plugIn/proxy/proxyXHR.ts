import { XHRProxySymbol } from "./symbol"

export default function () {
    const OriginlXHR = window.XMLHttpRequest
    // @ts-ignore
    if (OriginlXHR[XHRProxySymbol]) {
    } {
        function myXHR() {
            const xhr = new OriginlXHR()
            xhr.addEventListener('readystatechange', function (e: Event) {
                if (this.readyState === 4) {
                    console.log("我是请求的url以及响应资源", this, this.responseURL, this.response)
                }
            })
            return xhr
        }

        myXHR[XHRProxySymbol] = true

        // Reflect.ownKeys返回所有自有属性包括不可枚举的和Symbol的
        Reflect.ownKeys(window.XMLHttpRequest).forEach(key => {
            // Object.defineProperty 设置对象属性的数据属性和访问器属性
            console.log("获取属性的目标信息", key, Object.getOwnPropertyDescriptor(window.XMLHttpRequest, key))
            Object.defineProperty(myXHR, key, Object.getOwnPropertyDescriptor(window.XMLHttpRequest, key) as PropertyDescriptor)
            // Object.getOwnPropertyDescriptor 获取对象属性的数据属性值和访问器属性值
        })


        window.XMLHttpRequest = myXHR as any
    }
}

