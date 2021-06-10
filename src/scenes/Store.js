import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";
import Item from "../js/Item.js";

export default class Store extends Scene{
    constructor() {
        super("Store", "./assets/insertBackgroundImageHere");
        this.storeItems = new Map();
    }

    preload() {
        super.preLoad();
    }

    create() {

        super.create();
    }

    update(time, delta) {

        super.create();
    }

    horizontalWrap(sprite) {
    }

    addItemToTheStore(itemName, itemFilePath) {
        this.storeItems.set(itemName, new Item(itemName, itemFilePath));
    }

    getItemFilePathFromStore(key) {
        return this.storeItems.get(key).getItemFilePath();
    }

    isItemUnlockedInTheStore(key) {
        return this.storeItems.get(key).isItemUnlocked();
    }

    unlockItemInTheStore(key) {
        this.storeItems.get(key).unlockItem();
    }

}