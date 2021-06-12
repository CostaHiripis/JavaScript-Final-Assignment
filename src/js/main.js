import Phaser from "../lib/Phaser.js";
import Game from "../scenes/Game.js";
import Store from "../scenes/Store.js";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scene: Game,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 200
            },
            debug: true
        }
    }
})