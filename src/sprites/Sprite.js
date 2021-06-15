import Phaser from "../lib/Phaser.js";

export default class Sprite extends Phaser.GameObjects.Sprite{
    constructor(spriteScene, spriteXPosition, spriteYPosition, spriteTexture) {
        super(spriteScene, spriteXPosition, spriteYPosition, spriteTexture);
        this.spriteScene = spriteScene;
        this.spriteXPosition = spriteXPosition;
        this.spriteYPosition = spriteYPosition;
        this.spriteTexture = spriteTexture;
    }

    getSpriteScene() {
        return this.spriteScene;
    }

    getSpriteXPosition() {
        return this.spriteXPosition;
    }

    getSpriteYPosition() {
        return this.spriteYPosition;
    }

    getSpriteTexture() {
        return this.spriteTexture;
    }

    setSpriteScene(spriteScene) {
        this.spriteScene = spriteScene;
    }

    setSpriteXPosition(spriteXPosition) {
        this.spriteXPosition = spriteXPosition;
    }

    setSpriteYPosition(spriteYPosition) {
        this.spriteYPosition = spriteYPosition;
    }

    setSpriteTexture(spriteTexture) {
        this.spriteTexture = spriteTexture;
    }
}