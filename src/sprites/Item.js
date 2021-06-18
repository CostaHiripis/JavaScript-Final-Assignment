export default class Item {
    constructor(itemName, itemFilePath) {
        this.itemName = itemName;
        this.itemFilePath = itemFilePath;
        this.itemUnlocked = false;
    }

    getItemName() {
        return this.itemName;
    }

    getItemFilePath() {
        return this.itemFilePath;
    }

    isItemUnlocked() {
        return this.itemUnlocked;
    }

    setItemName(itemName) {
        this.itemName = itemName;
    }

    setItemFilePath(itemFilePath) {
        this.itemFilePath = itemFilePath;
    }

    unlockItem() {
        this.itemUnlocked = true;
    }

    lockItem() {
        this.itemUnlocked = false;
    }
}