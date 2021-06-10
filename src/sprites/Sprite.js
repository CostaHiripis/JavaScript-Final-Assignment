import Phaser from "../lib/Phaser.js";

export default class Sprite {
    constructor(xPosition, yPosition) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    getXPosition() {
        return this.xPosition;
    }

    getYPosition() {
        return this.yPosition;
    }

    setXPosition(xPosition) {
        this.xPosition = xPosition;
    }

    setYPosition(yPosition) {
        this.yPosition = yPosition;
    }

}