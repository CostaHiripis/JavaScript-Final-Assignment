import Phaser from "../../lib/phaser.js";
import Sprinkler from "./Sprinkler.js";

export default class RotatingSprinkler extends Sprinkler {
    constructor(rotatingSprinklerFilePath, rotatingSprinklerRadius, rotatingSprinklerXPosition, rotatingSprinklerYPosition) {
        super(rotatingSprinklerFilePath, rotatingSprinklerXPosition, rotatingSprinklerYPosition);
        this.rotatingSprinklerRadius = rotatingSprinklerRadius;
    }

    getRotatingSprinklerRadius() {
        return this.rotatingSprinklerRadius;
    }

    setRotatingSprinklerRadius(rotatingSprinklerRadius) {
        this.rotatingSprinklerRadius = rotatingSprinklerRadius;
    }
}