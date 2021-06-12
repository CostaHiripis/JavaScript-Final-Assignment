import Phaser from "../../lib/phaser.js";
import Sprinkler from "./Sprinkler.js";

export default class StationarySprinkler extends Sprinkler{
    constructor(stationarySprinklerSpan, stationarySprinklerFilePath, stationarySprinklerXPosition, stationarySprinklerYPosition) {
        super(stationarySprinklerFilePath, stationarySprinklerXPosition, stationarySprinklerYPosition);
        this.stationarySprinklerSpan = stationarySprinklerSpan;
    }

    getStationarySprinklerSpan() {
        return this.stationarySprinklerSpan;
    }

    setStationarySprinklerSpan(stationarySprinklerSpan) {
        this.stationarySprinklerSpan = stationarySprinklerSpan;
    }
}