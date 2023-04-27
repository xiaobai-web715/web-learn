interface IParams {
    message: string
}
export const objToUrl = (params: IParams): String => {
    let searchInfo = '?'
    const keys = Object.keys(params)
    keys.forEach((key, index) => {
        searchInfo = searchInfo + `${(index === 0) ? '' : '&'}${key}=${params[key]}`
    })
    return searchInfo
}
