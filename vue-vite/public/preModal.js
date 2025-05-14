class Modal {
    constructor() {
        this.createModal()
    }
    createModal() {
        
    }
}

class PreModal {
    constructor() {
    }
    showModal() {
        this.modal = new Modal()
    }
}


window.preModal = new PreModal()