import Phaser from "../lib/Phaser.js";

export default class Sprite {
    constructor(filePath, xPosition, yPosition) {
        this.filePath = filePath;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    getFilePath() {
        return this.filePath;
    }
    getXPosition() {
        return this.xPosition;
    }

    getYPosition() {
        return this.yPosition;
    }

    setFilePath(filePath) {
        this.filePath = filePath;
    }

    setXPosition(xPosition) {
        this.xPosition = xPosition;
    }

    setYPosition(yPosition) {
        this.yPosition = yPosition;
    }

}