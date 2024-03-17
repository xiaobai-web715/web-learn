(() => {
    class SelfDiv extends HTMLElement {
        constructor() {
            super()
            const shadow = this.attachShadow({mode: 'open'})
            // const sandbox = this.getAttribute
            // shadow.appendChild(targetDom)   
        }
    }
    customElements.define('my-blog', SelfDiv)
})()