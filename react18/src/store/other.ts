import { makeAutoObservable } from "mobx";

class OtherStore {
    count = 0;
    arr = [0, 1, 2];
    name = 'lxh';
    constructor() {
        makeAutoObservable(this);
    }
    add() {
        this.count++;
    }
}

export default OtherStore;