const eventBus = {
    eventList: [],
    $on(callbackFun, name) {
        this.eventList.push({
            name, 
            callbackFun
        });
    },
    $emit(name, data) {
        this.eventList.forEach(element => {
            if (name == element.name) {
                element.callbackFun(data);
            }
        });
    }
};

export default eventBus;