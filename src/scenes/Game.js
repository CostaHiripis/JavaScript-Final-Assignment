import Phaser from "../lib/Phaser.js";
import Scene from "./Scene.js";

export default class Game extends Scene{
    constructor() {
        super("Game", "./resources/assets/bg.png");
        super.addFilePath("stationarySprinkler", "./resources/assets/obstacle.png");
        super.addFilePath("character", "./resources/assets/character.png");
    }

    cursors;

    preload() {
        this.sprinklers = this.physics.add.staticGroup();
        this.cursors = this.input.keyboard.createCursorKeys();
        super.preLoad();
    }

    create() {
        this.add.image(240, 320, "background")
            .setScrollFactor(1,0);

        // this.physics.add.image(240, 320, "obstacle")
        //     .setScale(0.5);

        this.randomlyGenerateAssetNAmountOfTimes("stationarySprinkler", 5).forEach((value, key) => {
            this.placeAsset(value[0], value[1], value[2]); console.log(value)
        });


        this.character = this.physics.add.sprite(240, 320, "character");
        this.physics.add.collider(this.sprinklers, this.character);
        this.character.body.checkCollision.up = false;
        this.character.body.checkCollision.left = false;
        this.character.body.checkCollision.right = false;

        this.cameras.main.startFollow(this.character);
        this.cameras.main.setDeadzone(this.scale.width * 1.5);
        super.create();
    }

    update(time, delta) {

        this.sprinklers.children.iterate(child => {
            const sprinkler = child;

            const scrollY = this.cameras.main.scrollY;
            if (sprinkler.y >= scrollY + 700) {
                sprinkler.y = scrollY - Phaser.Math.Between(50, 100);
                sprinkler.body.updateFromGameObject();
            }
        })
        const touchingDown = this.character.body.touching.down;


        this.character.setVelocityY(-100);


        if (this.cursors.left.isDown) {
            this.character.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.character.setVelocityX(200);
        } else {
            this.character.setVelocityX(0);
        }

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
}