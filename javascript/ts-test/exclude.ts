// 从T中剔除可以赋值给U的类型
type TExclude1 = Exclude<"a" | "b" | "d", "a" | "c">

type TExclude2 = Extract<"a" | "b" | "d", "a" | "c">
