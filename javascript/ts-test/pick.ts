interface IPeopleB {
    name: string,
    age?: number,
    sex: string
}

type TPick = Pick<IPeopleB, "age" | "sex"> //将当前类型中选取部分类型返回生成一个新的类型



// 如果新生成的类型当中要存在自定义的属性
interface IPeopleA {
    name: string,
    age?: number,
    sex: string,
    [key: string]: any
}

type TPickA = Pick<IPeopleA, "age" | "sex" | "color"> //将当前类型中选取部分类型返回生成一个新的类型