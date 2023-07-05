"use strict";

import "./styles.scss";
import _, { curry, set } from "lodash";
import { createTag, createMultiTags } from "./modules/functions";
import { allWords, alphabet } from "./modules/word_list";

class Hangman {
  constructor(player) {
    this.player = player;
    this.highScore = 0;
    this.tries = 6;
    this.guessedLetters = [];
    this.currentWord = "";
  }

  getTries() {
    return this.tries;
  }
  setTries(newTry) {
    this.tries = newTry;
  }

  getHighScore() {
    return this.highScore;
  }
  setHighScore(newHighScore) {
    this.highScore = newHighScore;
  }

  getGuessedLetters() {
    return this.guessedLetters;
  }
  setGuessedLetters(letter) {
    this.guessedLetters.push(letter);
  }
  resetGuessedLetters() {
    this.guessedLetters = [];
  }

  getCurrentWord() {
    return this.currentWord;
  }
  setCurrentWord(word) {
    this.currentWord = word;
  }
}

const clearBoard = () => {
  newGame.setCurrentWord("");
  newGame.resetGuessedLetters();
  const usedLetters = document.querySelectorAll(".usedLetter");
  for (let i = 0; i < usedLetters.length; i++) {
    usedLetters[i].classList.remove("usedLetter");
    usedLetters[i].classList.add("letter");
  }
  randomWord();
};

const randomWord = () => {
  let guessedLetters = newGame.getGuessedLetters();
  let chosenWord = _.sample(allWords).toUpperCase();
  chosenWord = newGame.setCurrentWord(changeUmlaute(chosenWord));
  console.log(newGame.getCurrentWord());
  checkLetters(guessedLetters);
};

const changeUmlaute = (word) => {
  let changedWord = word
    .replace("Ä", "AE")
    .replace("Ö", "OE")
    .replace("Ü", "UE");
  return changedWord;
};

const checkLetters = (list) => {
  let word = "";
  let currentWord = newGame.getCurrentWord();
  for (let i = 0; i < currentWord.length; i++) {
    if (list.includes(currentWord[i])) {
      word += currentWord[i];
    } else {
      word += "_";
    }
  }
  displayLetters(word);
};

const displayLetters = (word) => {
  displayWord.innerHTML = "";
  for (let j = 0; j < word.length; j++) {
    createTag(displayWord, "div", null, "letter", word[j]);
  }
};

const guessLetter = (letter) => {
  let guessedLetters = newGame.getGuessedLetters();
  guessedLetters = newGame.setGuessedLetters(letter);

  checkLetters(newGame.getGuessedLetters());
};

const newGame = new Hangman("Lucas");

const heading = createTag(null, "h1", "gameHeading", null, "Hangman");
let tries = newGame.getTries();
const displayTries = createTag(null, "p", "tries", null, `Tries: ${tries}`);
let highScore = newGame.getHighScore();
const displayHighScore = createTag(
  null,
  "p",
  "highScore",
  null,
  `High Score: ${highScore}`
);
const displayWord = createTag(null, "div", "displayWord");
const letterBox = createTag(null, "div", "letterBox");
const letters = createMultiTags(letterBox, "button", 26, "letter", alphabet);
const newWord = createTag(null, "button", "newWord", null, "New Word");

newWord.addEventListener("click", clearBoard);

letterBox.addEventListener("click", (e) => {
  let targetElement = e.target;
  if (targetElement.matches(".letter")) {
    targetElement.classList.remove("letter");
    targetElement.classList.add("usedLetter");
    guessLetter(e.srcElement.innerHTML);
  }
});
