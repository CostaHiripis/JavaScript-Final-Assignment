import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";
import CharacterSprite from "../sprites/Character.js";
import Cashoola from "../sprites/pickables/Cashoola.js";
import StationarySprinkler from "../sprites/sprinklers/StationarySprinkler.js";
import HighScore from "../js/HighScore.js";
import RotatingSprinkler from "../sprites/sprinklers/RotatingSprinkler.js";
import Reverse from "../sprites/pickables/Reverse.js";

export default class Game extends Scene {
    spawnStationarySprinklerEvent;
    spawnCashoolaEvent;
    spawnReverseEvent;
    difficultyEvent;

    timeSurvivedEvent;

    constructor(selectedCharacterFilePath) {
        super("Game", "./resources/assets/bg.png");
        super.addFilePath("threeLives", "./resources/assets/threeLives.png");
        super.addFilePath("twoLives", "./resources/assets/twoLives.png");
        super.addFilePath("oneLife", "./resources/assets/oneLife.png");
        super.addFilePath("zeroLives", "./resources/assets/zeroLives.png");
        // super.addFilePath("cashoola1", "./resources/assets/cashoola.png");
        // this.character = new Character(character.getCharacterName(), character.getFilePath(), character.getXPosition(), character.getYPosition());
        // this.addFilePath("character", selectedCharacterFilePath);
        // this.addFilePath("character", "./resources/assets/characters/character1/back.png");

    }


    preload() {
        this.load.spritesheet("character", "./resources/assets/characters/character-1.png", {
            frameWidth: 48,
            frameHeight: 48
        });
        this.load.spritesheet("sprinkler", "./resources/assets/sprinkler.png", {frameWidth: 140, frameHeight: 80});
        this.load.spritesheet("cashoola", "./resources/assets/cashoola.png", {frameWidth: 563, frameHeight: 564});
        this.load.spritesheet("reverse", "./resources/assets/reverse.png", {frameWidth: 563, frameHeight: 564});

        this.stationarySprinklers = this.physics.add.staticGroup();
        this.rotatingSprinklers = this.physics.add.staticGroup();
        this.cashoolas = this.physics.add.staticGroup();
        this.reverses = this.physics.add.staticGroup();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.timeSurvived = new HighScore("TimeSurvived", 0);
        super.preLoad();
    }

    create() {
        //Rotating sprinkler animation
        this.anims.create({
            key: "rotatingSprinkler",
            frames: this.anims.generateFrameNumbers("sprinkler", {start: 0, end: 23}),
            frameRate: 1,
            repeat: -1
        });

        //Stationary sprinkler animation
        this.anims.create({
            key: "stationarySprinkler",
            frames: this.anims.generateFrameNumbers("sprinkler", {start: 0, end: 23}),
            frameRate: 12,
            repeat: -1
        });

        //Chashoola animation
        this.anims.create({
            key: "cashoola",
            frames: this.anims.generateFrameNumbers("cashoola", {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });

        //Reverse animation
        this.anims.create({
            key: "reverse",
            frames: this.anims.generateFrameNumbers("reverse", {start: 0, end: 9}),
            frameRate: 10,
            repeat: -1
        });


        //Character walk forward animation
        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("character", {frames: [9, 10, 11]}),
            frameRate: 8,
            repeat: -1
        });

        //Character walk left animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("character", {frames: [3, 4, 5]}),
            frameRate: 8,
            repeat: -1
        });

        //Character walk right animation
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("character", {frames: [6, 7, 8]}),
            frameRate: 8,
            repeat: -1
        });

        //Creating character
        this.character = new CharacterSprite("jon", this, 240, 320, "character", "-20");
        //Setting character hitbox
        this.character.setSize(25, 40);
        //Setting character animation
        this.character.play("walk");

        //Character follow camera for character
        this.cameras.main.startFollow(this.character);
        this.cameras.main.setDeadzone(this.scale.width * 1.5);

        //Adding background image
        this.add.image(240, 320, "background")
            .setScrollFactor(1, 0);

        //Time survived event
        this.timeSurvivedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.timeSurvivedIncrementer,
            callbackScope: this,
            loop: true
        });

        //Difficulty event
        this.difficultyEvent = this.time.addEvent({
            delay: 5000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
        });

        //Cashoola spawner
        this.spawnCashoolaEvent = this.time.addEvent({
            delay: Phaser.Math.Between(3000, 5000),
            callback: this.spawnCashoola,
            callbackScope: this,
            loop: true
        });

        //Reverse spawner
        this.spawnStationarySprinklerEvent = this.time.addEvent({
            delay: Phaser.Math.Between(5000, 7000),
            callback: this.spawnReverse,
            callbackScope: this,
            loop: true
        });

        //Stationary sprinkler spawner
        this.spawnStationarySprinklerEvent = this.time.addEvent({
            delay: 2000,
            callback: this.spawnStationarySprinkler,
            callbackScope: this,
            loop: true
        });

        //Character collision with stationary sprinklers
        this.createColliderBetweenTwoAssets(this.character, this.stationarySprinklers, this.hitSprinkler);
        // this.physics.add.collider(this.character, this.stationarySprinklers, this.hitSprinkler, null, this);

        //Character collision with rotating sprinklers
        this.createColliderBetweenTwoAssets(this.character, this.rotatingSprinklers, this.hitSprinkler);
        // this.physics.add.collider(this.character, this.rotatingSprinklers, this.hitSprinkler, null, this);

        //Chashoola collision with stationary sprinklers
        this.createColliderBetweenTwoAssets(this.cashoolas, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.cashoolas, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset,
        //     null, this);

        //Chashoola collision with rotating sprinkler
        this.createColliderBetweenTwoAssets(this.cashoolas, this.rotatingSprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.cashoolas, this.rotatingSprinklers, this.assetSpawnedOnAnotherAsset,
        //     null, this);

        //Reverse collision with stationary sprinklers
        this.createColliderBetweenTwoAssets(this.reverses, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.reverses, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset,
        //     null, this);

        //Reverse collision with rotating sprinkler
        this.createColliderBetweenTwoAssets(this.reverses, this.rotatingSprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.reverses, this.rotatingSprinklers, this.assetSpawnedOnAnotherAsset,
        //     null, this);

        //Stationary sprinkler collision with stationary sprinkler
        this.createColliderBetweenTwoAssets(this.stationarySprinklers, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.stationarySprinklers, this.stationarySprinklers,
        //     this.assetSpawnedOnAnotherAsset, null, this);

        //Rotating sprinkler collision with stationary sprinkler
        this.createColliderBetweenTwoAssets(this.rotatingSprinklers, this.stationarySprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.rotatingSprinklers, this.stationarySprinklers,
        //     this.assetSpawnedOnAnotherAsset, null, this);

        //Rotating sprinkler collision with rotating sprinkler
        this.createColliderBetweenTwoAssets(this.rotatingSprinklers, this.rotatingSprinklers, this.assetSpawnedOnAnotherAsset);
        // this.physics.add.collider(this.rotatingSprinklers, this.rotatingSprinklers,
        //     this.assetSpawnedOnAnotherAsset, null, this);

        //Character collision with cashoola
        this.createColliderBetweenTwoAssets(this.character, this.cashoolas, this.pickedUpCashoola);
        // this.physics.add.collider(this.character, this.cashoolas, this.pickedUpCashoola, null, this);

        //Character collision with reverse
        this.createColliderBetweenTwoAssets(this.character, this.reverses, this.pickedUpReverse);
        // this.physics.add.collider(this.character, this.reverses, this.pickedUpReverse, null, this);

        //Health Bar
        this.healthImage = this.add.image(this.cameras.main.scrollX + 90, this.cameras.main.scrollY, "threeLives");
        this.healthImage.setPosition(65);
        this.healthImage.scale = 0.6;
        this.healthImage.setDepth(1);
        //Cashoola Count
        super.create();
    }

    update(time, delta) {

        //Normal horizontal velocity
        if (this.character.getCharacterMovement() === "Normal") {
            if (this.cursors.left.isDown) {
                this.character.setVelocityX(-300 + 2 * parseInt(this.character.getCharacterSpeed()));
                this.character.play("left", true);
            } else if (this.cursors.right.isDown) {
                this.character.setVelocityX(300 + 2 * this.character.getCharacterSpeed().replace("-", ""));
                this.character.play("right", true);
            } else {
                this.character.setVelocityX(0);
                this.character.play("walk", true);
            }
        //Flipped horizontal velocity for reverse token
        } else {
            if (this.cursors.left.isDown) {
                this.character.setVelocityX(300 + 5 * this.character.getCharacterSpeed().replace("-", ""));
                this.character.play("left", true);
            } else if (this.cursors.right.isDown) {
                this.character.setVelocityX(-300 + 5 * parseInt(this.character.getCharacterSpeed()));
                this.character.play("right", true);
            } else {
                this.character.setVelocityX(0);
                this.character.play("walk", true);
            }
        }

        //Making character able to phase through the walls
        super.horizontalWrap(this.character);

        //Updating the health in the top left
        if (this.character.getLives() === 3) {
            this.healthImage.setTexture("threeLives");
        } else if (this.character.getLives() === 2) {
            this.healthImage.setTexture("twoLives");
        } else if (this.character.getLives() === 1) {
            this.healthImage.setTexture("oneLife");
        } else {
            this.healthImage.setTexture("zeroLives");
            this.character.destroy();
        }

        //Maintaining top left position
        this.healthImage.y = this.cameras.main.scrollY;

        //Rotating the rotating sprinklers
        this.rotatingSprinklers.rotate(1);

        this.rotatingSprinklers.children.entries.forEach(x => {
            x.body.setSize(100,100);
        });

        this.stationarySprinklers.children.entries.forEach(x => {
            x.body.setSize(150,70);
        });
        super.update(time, delta);
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

    spawnRotatingSprinkler() {
        this.generateAsset("rotatingSprinkler");
    }

    spawnReverse() {
        this.generateAsset("reverse");
    }

    generateAsset(asset) {
        if (asset === "stationarySprinkler") {
            this.placeAsset(new StationarySprinkler(this, 1.2, "stationarySprinkler",
                Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height))));
        } else if (asset === "rotatingSprinkler") {
            this.placeAsset(new RotatingSprinkler(this, 1, "rotatingSprinkler",
                Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height))));
        } else if (asset === "cashoola") {
            this.placeAsset(new Cashoola(this, Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height)), "cashoola", 1));
        } else if (asset === "reverse") {
            this.placeAsset(new Reverse(this, Phaser.Math.Between(0, this.game.config.width),
                (this.cameras.main.scrollY - Phaser.Math.Between(500, this.game.config.height)), "reverse"))
        }
    }

    placeAsset(asset) {
        if (asset instanceof StationarySprinkler) {
            const stationarySprinkler = this.stationarySprinklers.create(asset.getSpriteXPosition(), asset.getSpriteYPosition(), asset.getSpriteTexture());
            stationarySprinkler.scale = asset.getStationarySprinklerSpan();
            stationarySprinkler.play("stationarySprinkler", false);
            stationarySprinkler.body.updateFromGameObject();
        } else if (asset instanceof RotatingSprinkler) {
            const rotatingSprinkler = this.rotatingSprinklers.create(asset.getSpriteXPosition(), asset.getSpriteYPosition(), asset.getSpriteTexture());
            rotatingSprinkler.scale = asset.getRotatingSprinklerRadius();
            rotatingSprinkler.play("rotatingSprinkler", false);
            rotatingSprinkler.body.updateFromGameObject();
        } else if (asset instanceof Cashoola) {
            const cashoola = this.cashoolas.create(asset.getSpriteXPosition(), asset.getSpriteYPosition(), asset.getSpriteTexture());
            cashoola.scale = 0.03;
            cashoola.play("cashoola", false);
            cashoola.body.updateFromGameObject();
        } else if (asset instanceof Reverse) {
            const reverse = this.reverses.create(asset.getSpriteXPosition(), asset.getSpriteYPosition(), asset.getSpriteTexture());
            reverse.scale = 0.03;
            reverse.play("reverse", false);
            reverse.body.updateFromGameObject();
        }
    }

    createColliderBetweenTwoAssets(assetOne, assetTwo, methodToExecuteWhenTheyCollide) {
        this.physics.add.collider(assetOne, assetTwo, methodToExecuteWhenTheyCollide, null, this);
    }

    hitSprinkler(character, sprinkler) {
        character.deductLife();
        sprinkler.destroy();
    }

    pickedUpCashoola(character, cashoola) {
        character.addNewChashoolaToTheCharacter(cashoola);
        cashoola.destroy();
    }

    pickedUpReverse(character, reverse) {
        character.changeCharacterMovement();
        reverse.destroy();
    }

    assetSpawnedOnAnotherAsset(asset1, asset2) {
        asset1.destroy();
        this.generateAsset(asset1.getSpriteTexture());
    }

    // cashoolaSpawnedOnRotatingSprinkler(cashoola, rotatingSprinkler) {
    //     cashoola.destroy();
    //     this.generateAsset("cashoola");
    // }
    //
    // stationarySprinklerSpawnedOnStationarySprinkler(stationarySprinkler1, stationarySprinkler2) {
    //     stationarySprinkler1.destroy();
    //     this.generateAsset("stationarySprinkler");
    // }
    //
    // rotatingSprinklerSpawnedOnStationarySprinkler(rotatingSprinkler, stationarySprinkler) {
    //     rotatingSprinkler.destroy();
    //     this.generateAsset("rotatingSprinkler")
    // }
    //
    // rotatingSprinklerSpawnedOnRotatingSprinkler(rotatingSprinkler1, rotatingSprinkler2) {
    //     rotatingSprinkler1.destroy();
    //     this.generateAsset("rotatingSprinkler");
    // }

    timeSurvivedIncrementer() {
        this.timeSurvived.setHighScoreValue(this.timeSurvived.getHighScoreValue() + 1);
        if (this.timeSurvived.getHighScoreValue() > 20 && this.timeSurvived.getHighScoreValue() % 2 === 1 ) {
            this.spawnRotatingSprinkler();
        }

        if (this.timeSurvived.getHighScoreValue() > 40 && this.timeSurvived.getHighScoreValue() % 2 === 1) {
            this.spawnStationarySprinkler();
        }

        if (this.timeSurvived.getHighScoreValue() > 60 && this.timeSurvived.getHighScoreValue() % 2 === 1) {
            this.spawnRotatingSprinkler();
        }

    }
}