import Phaser from "../../lib/phaser.js";
import Sprite from "../Sprite.js";

export default class Sprinkler extends Sprite {
    constructor(sprinklerFilePath, sprinklerXPosition, sprinklerYPosition) {
        super(sprinklerXPosition, sprinklerYPosition);
        this.sprinklerFilePath = sprinklerFilePath;
    }

    getSprinklerFilePath() {
        return this.sprinklerFilePath
    }

    setSprinklerFilePath(sprinklerFilePath) {
        this.sprinklerFilePath = sprinklerFilePath;
    }
}