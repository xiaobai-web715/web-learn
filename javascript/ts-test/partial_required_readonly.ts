// 生成一个T所有属性均为的可选的新类型
interface IPeopleD {
    name: string,
    age?: number,
    sex: string
}

type TPartial = Partial<IPeopleD>

// 生成一个T所有属性均为必须的新类型

type TPartialB = Required<IPeopleD>

// 生成一个T所有属性均为仅读的新类型

type TPartialC = Readonly<IPeopleD>