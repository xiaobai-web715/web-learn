interface objectI {
    [key: string]: string | objectI[] | Array
}
interface propsI {
    key: string,
    columns: objectI[],
    sureCallback: (key: string, value: objectI | objectI[]) => void,
    cancelCallback: () => void
}