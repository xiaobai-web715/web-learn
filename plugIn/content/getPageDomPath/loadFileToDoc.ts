const loadFileToDoc = () => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = chrome.runtime.getURL('content/style.css')
    document.head.appendChild(link)
    console.log("css样式添加完成", document.head)
}

export default loadFileToDoc