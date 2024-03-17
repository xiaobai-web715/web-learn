/*
 * @Author: ***
 * @Date: 2024-02-25 11:33:21
 * @LastEditTime: 2024-02-25 15:26:03
 * @LastEditors: ***
 * @Description: 
 * @FilePath: \web-learn\react-optimize\src\shadDom\index.ts
 * 加油搞起来
 */
(function () {
    class SelfDiv extends HTMLElement {
        constructor() {
            super()
            const shadow = this.attachShadow({ mode: 'open' })
            const blogHeader = document.createElement('div')
            blogHeader.innerHTML = `
            <div>
                <style>
                    article {
                        margin: 20px auto;
                        border: 1px solid gray;
                        padding: 8px;
                    }
                    
                    header {
                        background: lightblue;
                        color: #fff;
                        font-size: 24px;
                        border: 1px solid lightblue;
                    }
                </style>
                <article>
                <header>博客标题</header>
                <section>博客内容</section>
                </article>
            </div>
            `
            shadow.appendChild(blogHeader)
        }
    }


    customElements.define('blog-header', SelfDiv)

})()