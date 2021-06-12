import Sprite from "../Sprite.js";

export default class Pickable extends Sprite {
    constructor(pickableFilePath, pickableXPosition, pickableYPosition, pickableValue) {
        super(pickableFilePath, pickableXPosition, pickableYPosition);
        this.pickableValue = pickableValue;
    }

    getPickableValue() {
        return this.pickableValue;
    }

    setPickableValue(pickableValue) {
        this.pickableValue = pickableValue;
    }
}