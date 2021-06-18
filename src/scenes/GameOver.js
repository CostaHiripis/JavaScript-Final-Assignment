import Scene from "./Scene.js";
import Phaser from "../lib/phaser.js";

export default class GameOver extends Scene {
    constructor() {
        super("GameOver", "./resources/assets/bg.png");
    }

    preLoad() {
        super.preLoad();
    }

    create() {
        this.add.image(240, 320, "background");

        let gameOverText = this.add.group();
        gameOverText.classType = Phaser.GameObjects.Text;

        //Creating text
        let title = gameOverText.create(125, 150, "Game Over", {fontSize: 50, color: "white"});
        let reverseTokenHighScore = gameOverText.create(80, 280, "Time survived: " + localStorage.getItem("timeSurvived") + " seconds",
            {fontSize: 18, color: "white"});
        let timeSurvivedHighScore = gameOverText.create(80, 300, "Reverse tokens picked up: " + localStorage.getItem("reverseTokensCollected"),
            {fontSize: 18, color: "white"});
        let playAgain = gameOverText.create(180, 420, "Play again", {fontSize: 20, color: "white"});
        let mainMenu = gameOverText.create(188, 460, "Main menu", {fontSize: 20, color: "white"});


        //Making titles intractable
        playAgain.setInteractive(new Phaser.Geom.Rectangle(0, 0, playAgain.width, playAgain.height), Phaser.Geom.Rectangle.Contains);
        mainMenu.setInteractive(new Phaser.Geom.Rectangle(0, 0, mainMenu.width, mainMenu.height), Phaser.Geom.Rectangle.Contains);

        //Variables in order for the functions below to access the data
        let scene = this.scene;

        //Input Event listeners
        this.input.on('gameobjectdown', function (pointer, gameObject) {


            if (gameObject.text === "Play again") {
                localStorage.removeItem("timeSurvived");
                localStorage.removeItem("reverseTokensCollected");
                scene.start("Game");
            } else if (gameObject.text === "Main menu") {
                localStorage.clear();
                scene.start("MainMenu");
            }

        });

        this.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject.text === "Play again" || "Main Menu") {
                gameObject.setColor("black");
            }
        });

        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setColor("white");
        });


        super.create();
    }

    update(time, delta) {
        super.update(time, delta);
    }
}