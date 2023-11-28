interface IPeople {
    name: string,
    age?: number,
    sex: string,
}

type T = keyof IPeople;

// type A = keyof T;

type TObj = {
    [P in T]: any
}

type TObjIn = {
    [P in keyof IPeople]: any
}

let a: TObj = {
    name: '123',
    sex: '456',
    age: '789'
}

let b: TObjIn = {
    name: '123',
    sex: '456'
}

const newPeople = {
    age: 12,
    address: '哈哈哈哈',
    sex: "other"
}

const array = [123, '456', true]
const func = (a, b) => { return a + b }

class TestClass {
    constructor() {
        console.log(this)
    }
    getClass() {
        console.log('getClass')
    }
    setClass() {
        console.log('setClass')
    }
}

type INewPeople = typeof newPeople;
type IArray = typeof array;
type IFunc = typeof func;
type ITestClass = typeof TestClass;

const people = {
    name: 'liuyz',
    age: 20,
    info: {
        sex: 'man',
        hobby: "sleep"
    }
}

type IPeopleG = typeof people

enum EDirection {
    UP = "UP",
    DOWN = "DOWN"
}
type TDirection = typeof EDirection

const direction: TDirection = {
    UP: EDirection.UP,
    DOWN: EDirection.DOWN
}

type IDirection = typeof direction

type TNewDirection = keyof IDirection

const newDirection: TNewDirection = "DOWN"

console.log(direction)