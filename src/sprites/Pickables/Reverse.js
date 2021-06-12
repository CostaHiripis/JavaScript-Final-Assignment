import Pickable from "./Pickable.js";

export default class Reverse extends Pickable {
    constructor(reverseFilePath, reverseXPosition, reverseYPosition) {
        super(reverseFilePath, reverseXPosition, reverseYPosition, "Reverse");
    }
}