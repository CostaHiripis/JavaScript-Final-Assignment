import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";
import CharacterSprite from "../sprites/Character.js";
import Cashoola from "../sprites/pickables/Cashoola.js";
import StationarySprinkler from "../sprites/sprinklers/StationarySprinkler.js";

export default class Game extends Scene{
    spawnStationarySprinklerEvent;
    difficultyEvent;
    spawnCashoolaEvent;

    constructor(selectedCharacterFilePath) {
        super("Game", "./resources/assets/bg.png");
        super.addFilePath("stationarySprinkler", "./resources/assets/obstacle.png");
        super.addFilePath("cashoola", "./resources/assets/ball.png");
        // this.character = new Character(character.getCharacterName(), character.getFilePath(), character.getXPosition(), character.getYPosition());
        // this.addFilePath("character", selectedCharacterFilePath);
        this.addFilePath("character", "./resources/assets/character.png");
    }



    preload() {
        this.sprinklers = this.physics.add.staticGroup();
        this.cashoolas = this.physics.add.staticGroup();
        this.cursors = this.input.keyboard.createCursorKeys();
        super.preLoad();
    }

    create() {

        this.character = new CharacterSprite("jon", this, 240, 320, "character", "-20");

        this.add.image(240, 320, "background")
            .setScrollFactor(1,0);

        this.createDifficultyEvent();
        this.createSpawnCashoolaEvent();
        this.createCashoolaCollisionWithSprinklers();
        this.createSpawnStationarySprinklerEvent();
        this.createCharacterCollisionsWithCashoola();
        this.createCharacterCollisionsWithSprinklers();
        this.createFollowCamera(this.character);

        super.create();
    }

    update(time, delta) {
        this.updateCharacterHorizontalVelocity();
        this.horizontalWrap(this.character);

        while (this.sprinklers.getLength() > 10) {
            this.generateAsset("sprinkler");
        }
        super.update(time, delta);
    }

    horizontalWrap(sprite) {
        super.horizontalWrap(sprite);
    }

    placeAsset(key, x, y, scale) {
        if (key === "stationarySprinkler") {
            const sprinkler = this.sprinklers.create(x, y, key);
            sprinkler.scale = scale;
            sprinkler.body.updateFromGameObject();
        } else if (key === "cashoola") {
            const cashoola = this.cashoolas.create(x, y, key);
            cashoola.scale = scale;
            cashoola.body.updateFromGameObject();
            cashoola.body.updateFromGameObject();
        }
    }

    createCashoolaCollisionWithSprinklers() {
        this.physics.add.collider(this.cashoolas, this.sprinklers, this.cashoolaSpawnedOnSprinkler, null, this);
    }

    createCharacterCollisionsWithSprinklers() {
        this.physics.add.collider(this.character, this.sprinklers, this.hitSprinkler, null, this);
    }

    createCharacterCollisionsWithCashoola() {
        this.physics.add.collider(this.character, this.cashoolas, this.pickedUpSprinkler, null, this);
    }

    hitSprinkler(character, sprinkler) {
        character.deductLife();
        sprinkler.destroy();
        console.log(character.getLives());
        if (this.character.getLives() === 0) {
            window.alert("hh")
        }
    }

    createFollowCamera(character) {
        this.cameras.main.startFollow(character);
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
    }

    cashoolaSpawnedOnSprinkler(cashoola, sprinkler) {
        cashoola.destroy();
        this.generateAsset("cashoola");
    }

    updateCharacterHorizontalVelocity() {
        if (this.cursors.left.isDown) {
            this.character.setVelocityX(-300 + 2 * parseInt(this.character.getCharacterSpeed()));
            console.log(-300 + 2 * parseInt(this.character.getCharacterSpeed()))
        } else if (this.cursors.right.isDown) {
            this.character.setVelocityX(300 +  2 * this.character.getCharacterSpeed().replace("-",""));
            console.log(300 +  2 * this.character.getCharacterSpeed().replace("-",""))
        } else {
            this.character.setVelocityX(0);
        }
    }

    generateAsset(asset) {
        if (asset === "stationarySprinkler") {
            let sprinkler = new StationarySprinkler(this, Phaser.Math.FloatBetween(0.4, 0.8), "stationarySprinkler",
                Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height)));

            this.placeAsset(sprinkler.getSpriteTexture(), sprinkler.getSpriteXPosition(), sprinkler.getSpriteYPosition(),
                sprinkler.getStationarySprinklerSpan());
        } else if (asset === "cashoola") {
            let cashoola = new Cashoola(this, Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height)), "cashoola", 1);
            this.placeAsset(cashoola.getSpriteTexture(), cashoola.getSpriteXPosition(), cashoola.getSpriteYPosition(), 1);
        }
    }


    spawnStationarySprinkler() {
        this.generateAsset("stationarySprinkler");
    }

    increaseDifficulty() {
        this.character.increaseCharacterSpeed();
    }

    spawnCashoola() {
        this.generateAsset("cashoola");
    }

    pickedUpSprinkler(character, cashoola) {
        character.addNewChashoolaToTheCharacter(cashoola);
        cashoola.destroy();
        console.log(character.getNumberOfChashoolaTheCharacterHas());
    }

    createSpawnCashoolaEvent() {
        this.spawnCashoolaEvent = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 10000),
            callback: this.spawnCashoola,
            callbackScope: this,
            loop: true
        });
    }

    createDifficultyEvent() {
        this.difficultyEvent = this.time.addEvent({
            delay: 5000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });
    }

    createSpawnStationarySprinklerEvent() {
        this.spawnStationarySprinklerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.spawnStationarySprinkler,
            callbackScope: this,
            loop: true
        });
    }

}