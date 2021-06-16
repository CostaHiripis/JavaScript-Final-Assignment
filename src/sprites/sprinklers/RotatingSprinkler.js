import Phaser from "../../lib/phaser.js";
import Sprinkler from "./Sprinkler.js";

export default class RotatingSprinkler extends Sprinkler {
    constructor(rotatingSprinklerScene, rotatingSprinklerRadius, rotatingSprinklerTexture, rotatingSprinklerXPosition, rotatingSprinklerYPosition) {
        super(rotatingSprinklerScene, rotatingSprinklerXPosition, rotatingSprinklerYPosition, rotatingSprinklerTexture);
        this.rotatingSprinklerRadius = rotatingSprinklerRadius;
    }

    getRotatingSprinklerRadius() {
        return this.rotatingSprinklerRadius;
    }

    setRotatingSprinklerRadius(rotatingSprinklerRadius) {
        this.rotatingSprinklerRadius = rotatingSprinklerRadius;
    }
}