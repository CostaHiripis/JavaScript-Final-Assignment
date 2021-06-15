import Phaser from "../../lib/phaser.js";
import Sprinkler from "./Sprinkler.js";

export default class StationarySprinkler extends Sprinkler{
    constructor(stationarySprinklerScene, stationarySprinklerSpan, stationarySprinklerTexture , stationarySprinklerXPosition, stationarySprinklerYPosition) {
        super(stationarySprinklerScene, stationarySprinklerXPosition, stationarySprinklerYPosition, stationarySprinklerTexture);
        this.stationarySprinklerSpan = stationarySprinklerSpan;
        this.scene = stationarySprinklerSpan;

    }

    getStationarySprinklerSpan() {
        return this.stationarySprinklerSpan;
    }

    setStationarySprinklerSpan(stationarySprinklerSpan) {
        this.stationarySprinklerSpan = stationarySprinklerSpan;
    }
}