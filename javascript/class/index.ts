class BaseView {
    public very: any[]
    constructor(arr: any[]) {
        this.very = arr;
    }
    public _init () : void {
        this.very.push(this)
    }
}

class FIRSTMODULE extends BaseView {
    public a = 1
}

class SECONDMODULE extends BaseView {
    public b = 2
}

const targetTest: any[] = [];
const first = new FIRSTMODULE(targetTest)._init()
const second = new SECONDMODULE(targetTest)._init()

console.log("target", targetTest)