interface IPeopleC {
    age: number,
    sex: string
}
interface TObject {
    a: object,
    b: object,
}

type RecordT = Record<keyof TObject, IPeopleC> //Record的第一个参数要能通过in操作(也就是type定义的联合类型)