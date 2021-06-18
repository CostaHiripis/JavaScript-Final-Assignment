import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";
import Item from "../sprites/Item.js";
import CharacterSprite from "../sprites/Character.js";

export default class Store extends Scene{
    constructor() {
        super("Store", "./resources/assets/bg.png");
        this.items = [];
    }

    preload() {
        for (let i = 0; i < 8; i++) {
            this.load.spritesheet("character" + i, "./resources/assets/characters/character-" + i + ".png", {
                frameWidth: 48,
                frameHeight: 48
            });
        }
        super.preLoad();
    }

    create() {
        this.add.image(240, 320, "background");

        for (let i = 0; i < 8; i++) {
            this.anims.create({
                key: "rotatingCharacter" + i,
                frames: this.anims.generateFrameNumbers("character" + i, {start: 0, end: 11}),
                frameRate: 8,
                repeat: -1
            });
        }



        let title = this.add.text(25, 80, "Select a character", { fontSize: 40, color: "white" });

        this.addItemToTheStore("jon", 100,250, "character-0", "rotatingCharacter0");
        this.addItemToTheStore("Jen", 200,250, "character-1", "rotatingCharacter1");
        this.addItemToTheStore("Len", 300,250, "character-2", "rotatingCharacter2");
        this.addItemToTheStore("Gwen", 400,250, "character-3", "rotatingCharacter3");
        this.addItemToTheStore("Wan", 100,400, "character-4", "rotatingCharacter4");
        this.addItemToTheStore("Man", 200,400, "character-5", "rotatingCharacter5");
        this.addItemToTheStore("Gan", 300,400, "character-6", "rotatingCharacter6");
        this.addItemToTheStore("Wegan", 400,400, "character-7", "rotatingCharacter7");

        let back = this.add.text(200, 500, "Back", { fontSize: 30, color: "white" });
        back.setInteractive(new Phaser.Geom.Rectangle(0, 0, back.width, back.height), Phaser.Geom.Rectangle.Contains);

        let scene = this.scene;

        this.input.on('gameobjectdown', function (pointer, gameObject) {
            if (gameObject.text === "Back") {
                scene.start("MainMenu");
            }

            if (gameObject instanceof CharacterSprite) {
                localStorage.setItem("character", gameObject.getCharacterTexture());
                scene.start("Game");
            }
        });

        this.input.on('gameobjectover', function (pointer, gameObject) {
            if (gameObject.text === "Back") {
                gameObject.setColor("black");
            }
        });

        this.input.on('gameobjectout', function (pointer, gameObject) {
            if (gameObject.text === "Back") {
                gameObject.setColor("white");
            }
        });

        super.create();
    }

    update(time, delta) {

        super.create();
    }

    horizontalWrap(sprite) {
    }

    addItemToTheStore(characterName, characterXPosition, characterYPosition, characterTexture, animation) {
        this.items.push(new CharacterSprite(characterName, this, characterXPosition, characterYPosition, characterTexture, 0).play(animation).setInteractive(new Phaser.Geom.Rectangle(0, 0, 100, 100), Phaser.Geom.Rectangle.Contains));
    }

}