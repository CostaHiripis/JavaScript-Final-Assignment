import Phaser from "../../lib/phaser.js";
import Scene from "./Scene.js";
import Game from "./Game.js";


export default class MainMenu extends Scene {
    character;

    constructor() {
        super("MainMenu", "./resources/assets/bg.png");
    }


    preload() {
        super.preLoad();
    }

    create() {
        this.add.image(240, 320, "background");

        let mainMenuText = this.add.group();
        mainMenuText.classType = Phaser.GameObjects.Text;

        //Creating text
        mainMenuText.create(50, 150, "Sprinkler Run", {fontSize: 50, color: "white"});
        let play = mainMenuText.create(200, 320, "Play", {fontSize: 35, color: "white"});
        let store = mainMenuText.create(45, 400, "Character Selection", {fontSize: 35, color: "white"});

        //Making titles intractable
        play.setInteractive(new Phaser.Geom.Rectangle(0, 0, play.width, play.height), Phaser.Geom.Rectangle.Contains);
        store.setInteractive(new Phaser.Geom.Rectangle(0, 0, store.width, store.height), Phaser.Geom.Rectangle.Contains);

        //Variables in order for the functions below to access the data
        let scene = this.scene;

        //Input Event listeners
        this.input.on('gameobjectdown', function (pointer, gameObject) {

            if (gameObject.text === "Play") {
                if (localStorage.getItem("character") == null) {
                    window.alert("You have to pick a character first");
                    scene.start("Store");
                } else {
                    scene.start("Game");
                }
            } else if (gameObject.text === "Character Selection") {
                scene.start("Store");
            }
        });

        this.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject.text === "Play" || "Character Selection") {
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