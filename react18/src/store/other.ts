import { makeAutoObservable } from "mobx";

class OtherStore {
    count = 0;
    constructor() {
        makeAutoObservable(this);
    }
    add() {
        this.count++;
    }
}

export default OtherStore;