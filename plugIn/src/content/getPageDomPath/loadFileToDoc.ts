import CorresPoand from "@//utils/correspond"

// const addStyleToContent = () => {
//     const link = document.createElement('link')
//     link.rel = 'stylesheet'
//     link.href = chrome.runtime.getURL('src/content/style.css')
//     document.head.appendChild(link)
// }

// const addIframeToContent = (): HTMLIFrameElement => {
//     const loadHtmlUrl = chrome.runtime.getURL('view/view.html')
//     const iframePanel = document.createElement('iframe')
//     iframePanel.src = loadHtmlUrl
//     iframePanel.setAttribute('sandbox', 'allow-scripts allow-forms')
//     iframePanel.classList.add("iframeInitialStyle")
//     document.body.appendChild(iframePanel)
//     return iframePanel
// }

const loadFileToDoc = (correspond: CorresPoand) => {
    // addStyleToContent()
    // const iframePanel = addIframeToContent()
    // correspond.iframePanel = iframePanel
}

export default loadFileToDoc