const getClassMakeUp = (className: string): string => {
    const classNameList = className.split(/\s+/)
    console.log("我是获取的dom的class的名称的list", classNameList)
    return `.${classNameList.filter(item => item).join('.')}`
}
export const getEleStruc = (dom: HTMLElement | null): string => {
    if (dom) {
        const className = dom.className;
        console.log("我是当前层级的className", className)
        const classMakeUp = className ? getClassMakeUp(className) : ''
        if (dom.parentElement) {
            return `${getEleStruc(dom.parentElement)} ${classMakeUp}`
        } else {
            return classMakeUp
        }
    } else {
        return ''
    }
}