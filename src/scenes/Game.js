import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";
import Character from "../sprites/Character.js";

export default class Game extends Scene{
    constructor(selectedCharacter) {
        super("Game", "./resources/assets/bg.png");
        super.addFilePath("stationarySprinkler", "./resources/assets/obstacle.png");
        // this.character = new Character(character.getCharacterName(), character.getFilePath(), character.getXPosition(), character.getYPosition());
        this.selectedCharacter = new Character("jon", "./resources/assets/character.png", 240, 320, 20);
        this.addFilePath("character", this.selectedCharacter.getFilePath());
    }

    preload() {
        this.sprinklers = this.physics.add.staticGroup();
        this.cursors = this.input.keyboard.createCursorKeys();
        super.preLoad();
    }

    create() {
        this.add.image(240, 320, "background")
            .setScrollFactor(1,0);

        this.randomlyGenerateAssetNAmountOfTimes("stationarySprinkler", 5).forEach((value, key) => {
            this.placeAsset(value[0], value[1], value[2]);
        });

        this.character = this.physics.add.sprite(this.selectedCharacter.getXPosition(), this.selectedCharacter.getYPosition(), "character");
        this.addCharacterCollisionsWithSprinklers(this.character);

        this.createFollowCamera(this.character);
        this.character.setVelocityY(this.selectedCharacter.getCharacterSpeed());

        super.create();
    }

    update(time, delta) {

        this.updateSprinklerPositionOnTheScreen();
        this.updateCharacterHorizontalVelocity();

        this.horizontalWrap(this.character);
        super.create();
    }

    horizontalWrap(sprite) {
        super.horizontalWrap(sprite);
    }

    placeAsset(key, x, y) {
        const sprinkler = this.sprinklers.create(x, y, key);
        sprinkler.scale = 0.5;

        const body = sprinkler.body;
        body.updateFromGameObject();
    }

    addCharacterCollisionsWithSprinklers(character) {
        this.physics.add.collider(this.sprinklers, character);
        character.body.checkCollision.up = false;
        character.body.checkCollision.left = false;
        character.body.checkCollision.right = false;
    }

    createFollowCamera(character) {
        this.cameras.main.startFollow(character);
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
    }

    isSprinklerOffTheScreen(sprinkler, screen) {
        return sprinkler.y >= screen + 700;
    }

    updateSprinklerPositionOnTheScreen() {
        this.sprinklers.children.iterate(child => {
            const sprinkler = child;
            const screen = this.cameras.main.scrollY;

            if (this.isSprinklerOffTheScreen(sprinkler, screen)) {
                sprinkler.y = screen - Phaser.Math.Between(50, 100);
                sprinkler.body.updateFromGameObject();
            }
        });
    }

    updateCharacterHorizontalVelocity() {
        if (this.cursors.left.isDown) {
            this.character.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.character.setVelocityX(200);
        } else {
            this.character.setVelocityX(0);
        }
    }
}