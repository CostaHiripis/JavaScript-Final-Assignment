import Sprite from "../Sprite.js";

export default class Pickable extends Sprite {
    constructor(pickableScene, pickableXPosition, pickableYPosition, pickableTexture, pickableValue) {
        super(pickableScene, pickableXPosition, pickableYPosition, pickableTexture);
        this.pickableValue = pickableValue;
    }

    getPickableValue() {
        return this.pickableValue;
    }

    setPickableValue(pickableValue) {
        this.pickableValue = pickableValue;
    }
}