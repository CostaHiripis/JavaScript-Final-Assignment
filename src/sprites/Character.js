import Phaser from "../lib/phaser.js";
import Sprite from "./Sprite.js";
import HighScore from "../js/HighScore";

export default class Character extends Sprite{
    constructor(characterName, characterFilePath, characterXPosition, characterYPosition) {
        super(characterFilePath, characterXPosition, characterYPosition);
        this.characterName = characterName;
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
    }
    
    getCharacterHighScoreValue(highScoreName) {
        this.getCharacterHighScore(highScoreName).getHighScoreValue();
    }

    getAmountOfChashoolaTheCharacterHas() {
        return this.characterCashoolas.length;
    }

    getCharacterMovement() {
        return this.characterMovement;
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