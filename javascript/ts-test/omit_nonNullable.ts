// 获取T中不包含K属性的新类型


interface IPeopleF {
    age: number,
    name?: string,
    sex: string
}
// 获取IPeopleF中不包含 age与sex两个属性的新类型
type OnlyName = Pick<IPeopleF, Exclude<keyof IPeopleF, 'age' | 'sex'>>

type OnlyName2 = Omit<IPeopleF, 'age' | 'sex'>


//NonNullable去除null和undefined后的新类型

type TType = number | null | undefined;
type TNonNullable = Exclude<TType, null | undefined>

type TNonNullable2 = NonNullable<TType>