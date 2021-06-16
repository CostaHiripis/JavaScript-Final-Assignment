import Phaser from "../lib/phaser.js";
import Sprite from "./Sprite.js";
import HighScore from "../js/HighScore.js";

export default class CharacterSprite extends Phaser.Physics.Arcade.Sprite{
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
        this.characterCashoolas = [];
        this.characterMovement = "Normal";

    }



    getCharacterName() {
        return this.characterName;
    }

    setCharacterName(characterName) {
        this.characterName = characterName;
    }


    addHighScoreToHighScores(highScoreName, highScoreValue) {
        if (!this.isThisCharacterHighScoreAlreadyCreated(highScoreName)) {
            let highScore = new HighScore(highScoreName, highScoreValue);
            this.characterHighScores.push(highScore);
        }
    }
    
    getCharacterHighScore(highScoreName) {
        if (this.isThisCharacterHighScoreAlreadyCreated(highScoreName)) {
            this.characterHighScores.forEach((highScore, index) =>{
                return highScore;
            })
        }
        return false;
    }
    
    getCharacterHighScoreValue(highScoreName) {
        if (this.getCharacterHighScore(highScoreName) !== false) {
            this.getCharacterHighScore(highScoreName).getHighScoreValue();
        }
    }

    getNumberOfChashoolaTheCharacterHas() {
        return this.characterCashoolas.length;
    }

    getCharacterMovement() {
        return this.characterMovement;
    }

    getCharacterSpeed() {
        return this.characterSpeed;
    }

    setANewHighScore(highScoreName, highScoreValue) {
        if (this.isThisCharacterHighScoreAlreadyCreated(highScoreName)) {
            this.characterHighScores.forEach((highScore, index) => {
                if (highScore.getHighScoreName() === highScoreName) {
                    highScore.setHighScoreValue(highScoreValue);
                }
            });
        }
    }

    addNewChashoolaToTheCharacter(cashoola) {
        this.characterCashoolas.push(cashoola);
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

    removeChashoolaFromCharacter(numberOfCashoolasToRemove) {
        this.characterCashoolas.splice(0, numberOfCashoolasToRemove);
    }

    isThisCharacterHighScoreAlreadyCreated(highScoreNameToCompare) {
        this.characterHighScores.forEach((highScore, index) => {
            if (highScore.getHighScoreName() === highScoreNameToCompare) {
                return true;
            }
        });
        return false;
    }


    deductLife() {
        this.characterLives = this.characterLives - 1;
    }

    getLives() {
        return this.characterLives;
    }



}