import Phaser from "../lib/phaser.js";
import Sprite from "./Sprite.js";
import HighScore from "../js/HighScore.js";

export default class Character extends Sprite{
    constructor(characterName, characterFilePath, characterXPosition, characterYPosition, characterSpeed) {
        super(characterFilePath, characterXPosition, characterYPosition);
        this.characterName = characterName;
        this.characterLives = 3;
        this.characterHighScores = [];
        this.characterCashoolas = [];
        this.characterMovement = "Normal";
        this.characterSpeed = "-" + characterSpeed;
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

    getAmountOfChashoolaTheCharacterHas() {
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

    setCharacterMovement(characterMovement) {
        if (this.isTheCharacterMovementValid(characterMovement)) {
            this.characterMovement = characterMovement;
        }
    }

    setCharacterSpeed(characterSpeed) {
        this.characterSpeed = "-" + characterSpeed;
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

    isTheCharacterMovementValid(characterMovement) {
        return characterMovement === "Reversed" || characterMovement === "Normal";
    }

}