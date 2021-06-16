import Pickable from "./Pickable.js";

export default class Reverse extends Pickable {
    constructor(reverseScene, reverseXPosition, reverseYPosition, reverseTexture) {
        super(reverseScene, reverseXPosition, reverseYPosition, reverseTexture, "Reverse");
    }
}