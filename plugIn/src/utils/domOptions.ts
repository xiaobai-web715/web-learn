const getClassMakeUp = (className: string): string => {
    const classNameList = className.split(/\s+/)
    return `.${classNameList.filter(item => item).join('.')}`
}
export const getEleStruc = (dom: HTMLElement | null): string => {
    if (dom) {
        const className = dom.className;
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