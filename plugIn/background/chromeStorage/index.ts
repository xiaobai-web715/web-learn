export enum ChromeStorageEnum {
    ELEMENT_PATH = 'element_path'
}

const ChromeStorage = {
    async getItem (key: ChromeStorageEnum) {
        return await chrome.storage.local.get([key])
    },
    async setItem <T>(key: ChromeStorageEnum, value: T) {
        return await chrome.storage.local.set({key: value})
    },
    async clear () {
        return await chrome.storage.local.clear()
    },
    async removeItem (key: ChromeStorageEnum) {
        return await chrome.storage.local.remove(key as unknown as string)
    }
}

export default ChromeStorage