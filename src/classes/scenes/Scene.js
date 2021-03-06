import Phaser from "../../lib/phaser.js";

export default class Scene extends Phaser.Scene {
    constructor(Scene, backgroundFilePath) {
        super(Scene);
        this.assetFilePaths = new Map();
        this.assetFilePaths.set("background", backgroundFilePath);
    }

    preLoad() {
        this.assetFilePaths.forEach((value, key) => {
            this.preLoadImage(key, value);
        });
    }

    create() {

    }

    update(time, delta) {

    }

    horizontalWrap(sprite) {
        const halfWidth = sprite.displayWidth * 0.5;
        const gameWidth = this.scale.width;

        if (sprite.x < -halfWidth) {
            sprite.x = gameWidth + halfWidth;
        } else if (sprite.x > gameWidth + halfWidth) {
            sprite.x = -halfWidth;
        }
    }

    getBackgroundFilePath() {
        return this.assetFilePaths.get("background");
    }

    setBackgroundFilePath(backgroundFilePath) {
        this.assetFilePaths.set("background", backgroundFilePath);
    }

    addFilePath(key, value) {
        this.assetFilePaths.set(key, value);
    }

    getFilePath(key) {
        return this.assetFilePaths.get(key);
    }

    getAllFilePaths() {
        return this.assetFilePaths;
    }

    preLoadImage(key, value) {
        this.load.image(key, value);
    }
}