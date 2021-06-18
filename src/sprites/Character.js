import Phaser from "../lib/phaser.js";

export default class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(characterName, characterScene, characterXPosition, characterYPosition, characterTexture, characterSpeed) {
        super(characterScene, characterXPosition, characterYPosition, characterTexture);
        characterScene.sys.updateList.add(this);
        characterScene.sys.displayList.add(this);
        characterScene.physics.world.enableBody(this);
        this.setImmovable(true);
        this.setDepth(1);
        this.characterScene = characterScene;
        this.characterName = characterName;
        this.characterSpeed = characterSpeed;
        this.setVelocityY(this.characterSpeed);
        this.characterLives = 3;
        this.characterHighScores = [];
        this.characterMovement = "Normal";
        this.characterTexture = characterTexture;
        this.reverseTokensCollected = 0;
    }


    getCharacterName() {
        return this.characterName;
    }

    setCharacterName(characterName) {
        this.characterName = characterName;
    }

    getCharacterTexture() {
        return this.characterTexture;
    }


    getCharacterHighScores() {
        return this.characterHighScores;
    }

    getCharacterHighScore(highScore) {
        let highScoreResult;
        this.characterHighScores.forEach((highScoreToCompare) => {
            if (highScoreToCompare.getHighScoreName() === highScore) {
                highScoreResult = highScoreToCompare;
            }
        })
        return highScoreResult;
    }


    getCharacterMovement() {
        return this.characterMovement;
    }

    getCharacterSpeed() {
        return this.characterSpeed;
    }

    addANewHighScore(highScore) {
        this.characterHighScores.push(highScore);
    }

    changeCharacterMovement() {
        if (this.characterMovement === "Normal") {
            this.characterMovement = "Reversed";
        } else {
            this.characterMovement = "Normal";
        }
    }

    setCharacterSpeed(characterSpeed) {
        this.characterSpeed = characterSpeed;
        this.setVelocityY(this.characterSpeed);
    }

    increaseCharacterSpeed() {
        let temp = parseInt(this.characterSpeed);
        temp -= 2;
        this.setCharacterSpeed(temp.toString());
    }

    deductLife() {
        this.characterLives = this.characterLives - 1;
    }

    getLives() {
        return this.characterLives;
    }

    getReverseTokensCollected() {
        return this.reverseTokensCollected;
    }

    collectAReverseToken() {
        this.reverseTokensCollected += 1;
    }

    setReverseTokensCollected(reverseTokensCollected) {
        this.reverseTokensCollected = reverseTokensCollected;
    }

}