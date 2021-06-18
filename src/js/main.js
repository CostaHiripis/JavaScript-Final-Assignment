import Phaser from "../lib/Phaser.js";
import Game from "../scenes/Game.js";
import Store from "../scenes/Store.js";
import MainMenu from "../scenes/MainMenu.js";
import GameOver from "../scenes/GameOver.js";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [MainMenu, Store, Game, GameOver],
    physics: {
        default: "arcade",
        // arcade: {
        //     debug: true
        // }
    },
})