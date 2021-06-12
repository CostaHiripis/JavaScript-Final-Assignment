import Phaser from "../lib/phaser.js";

export default class HighScore {
    constructor(highScoreName, highScoreValue) {
        this.highScoreName = highScoreName;
        this.highScoreValue = highScoreValue;
    }

    getHighScoreName() {
        return this.highScoreName;
    }

    getHighScoreValue() {
        return this.highScoreValue;
    }

    setHighScoreName(highScoreName) {
        this.highScoreName = highScoreName;
    }

    setHighScoreValue(highScoreValue) {
        this.highScoreValue = highScoreValue;
    }
}