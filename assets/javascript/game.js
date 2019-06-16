/*********************************************************************************
 **********************VARIABLE DECLARATIONS HERE********************************** 
 *********************************************************************************/
//Variables to map values back to screen
var winsText = document.getElementById("winsText");
var currentWordText = document.getElementById("currentWordText");
var guessesLeftText = document.getElementById("guessesLeftText");
var lettersGuessedSoFarText = document.getElementById("lettersGuessedSoFarText");

// Array with master list of simple medium and complex words
var simpleWordsArray = ['lion', 'cat', 'deer', 'tiger', 'dog', "horse", "bear", "camel", "fox", "wolf"];
var mediumWordsArray = ['tortoise', 'leopard', 'cheetah', 'elephant', 'donkey', 'monkey', 'squirel', 'turtle', 'lizard', 'word10'];
var complexWordsArray = ['kangaroo', 'rhinocerous', 'hippopotamous', 'reindeer', 'buffalo', 'comp6', 'comp7', 'comp8', 'comp9']

//Object for storing current game questions:
var currentGameQuestions = {
    simpleWordsChosen: [],
    mediumWordsChosen: [],
    complexWordsChosen: []
}

//Game State
var hasGameStarted = false;
var askNextQuestion = true;

//Counter Variables
var totalGuess = 100;
var winCounter = 0;
var totalPriceMoney = 0;

//Index Variables
var i = 0;

//Game Variables
var totalQuestionsInGame = 5;
var simpleWordsToBeAsked = 3;
var mediumWordsToBeAsked = 1;
var complexWordsToBeAsked = 1;
var questionNumber = 0;
var gameLevel;
var wordInPlay;

//Computer and Player Choice variables
var randomNumber = 0;
var userGuess = [];
var currentWord = [];
var computerWord = [];


/*********************************************************************************
 **********************OBJECT DECLARATIONS HERE************************************ 
 *********************************************************************************/
// Array with objects as members, where computer has choosen 5 words randomly from
// the master list

/*********************************************************************************
 **********************FUNCTIONS DEFINED HERE************************************** 
 *********************************************************************************/
//makeComputerChooseWords()
//Choose 3 random numbers - from simple words array get 3 words
//Choose 1 random number - from medium words array get 1 word
//Choose 1 random number - from complex words array get 1 word

function makeComputerChooseWords() {

    //Choose 3 simple words using random occurence: It is possible that same word is picked twice because of small 
    //dataset
    for (i = 0; i < simpleWordsToBeAsked; i++) {
        randomNumber = Math.floor((Math.random() * simpleWordsArray.length) + 1);
        currentGameQuestions.simpleWordsChosen.push(simpleWordsArray[randomNumber - 1]);
    }

    //Similar to simple words, choose a Medium word. For loop used as place holder in case number of questions in a 
    //game change and more mediumWords are needed.
    for (i = 0; i < mediumWordsToBeAsked; i++) {
        randomNumber = Math.floor((Math.random() * mediumWordsArray.length) + 1);
        currentGameQuestions.mediumWordsChosen.push(mediumWordsArray[randomNumber - 1]);
    }

    //Similar to simple words, choose a Complex word. For loop used as place holder in case number of questions in a 
    //game change and more mediumWords are needed.
    for (i = 0; i < complexWordsToBeAsked; i++) {
        randomNumber = Math.floor((Math.random() * complexWordsArray.length) + 1);
        currentGameQuestions.complexWordsChosen.push(complexWordsArray[randomNumber - 1]);
    }
    console.log(currentGameQuestions);
    console.log("Computer has chosen " + totalQuestionsInGame + " words");
}

//Function to determine game level based on question number - Simple, Medium or Complex
function determineGameLevel(questionNumber) {
    console.log("Question Number" + questionNumber);
    if (questionNumber <= simpleWordsToBeAsked) {
        gameLevel = "simple";
    } else if (questionNumber <= simpleWordsToBeAsked + mediumWordsToBeAsked) {
        gameLevel = "medium";
    } else {
        gameLevel = "complex";
    }
    console.log("Game Level is: " + gameLevel);
}

//Function to choose the word for current question from the choices Computer made for the game
function chooseWordForCurrentQuestion() {
    if (gameLevel == 'simple') {
        wordInPlay = currentGameQuestions.simpleWordsChosen[questionNumber - 1];
    } else if (gameLevel == 'medium') {
        wordInPlay = currentGameQuestions.mediumWordsChosen[questionNumber - simpleWordsToBeAsked - 1];
    } else {
        wordInPlay = currentGameQuestions.complexWordsChosen[questionNumber - simpleWordsToBeAsked - mediumWordsToBeAsked - 1];
    }
    for (i= 0; i< wordInPlay.length; i++){
        computerWord[i] = wordInPlay[i];
    }
    console.log("Word to be Guessed is: " + wordInPlay);
    console.log(computerWord);


}

//askQuestion ()
// Initialize variables Qustion, Current Word, Guesses So far, Guesses Left
// Accept Question Number as Argument
// Access object and obtain question, answer and price money
// Throw information on the screen
function askQuestionOnScreen() {
    totalGuess = wordInPlay.length * 2;
    document.querySelector("#computerMadeItsChoice").innerHTML = "Computer made its choice, start your guess";
    guessesLeftText.textContent = totalGuess;
    winsText.textContent = winCounter;
    for (i= 0; i<= wordInPlay.length; i++){
        currentWord[i] = '_';
        userGuess[i] = ' '
    }
    currentWordText.textContent = currentWord;
    lettersGuessedSoFarText.textContent = userGuess;

}

//validateUserGuess()
//Populate user key to array of guessed so far
//If user guessed key is in currentword, then reveal and populate userChoice array, remove letter from 
// userguessed array
//If user guessed key is not in current word, decrement guess Count
//If userChoice array = currentWord, then user wins
// Increment price money & Display press any key for next question

/*********************************************************************************
 ***************************MAIN PROCESS HERE************************************** 
 *********************************************************************************/


// CAPTURE THE KEY STROKE EVENT
document.querySelector("#computerMadeItsChoice").innerHTML = "Press any key to start the game";
document.onkeyup = function (event) {
    //CHECK IF THE GAME HAS STARTED
    if (!hasGameStarted) {
        //IF THE GAME HAS NOT STARTED
        //   INITIALIZE THE COUNTERS - WINS, PRICE MONEY
        //   Call makeComputerMakeTheChoice()
        winCounter = 0;
        totalPriceMoney = 0;
        console.log("Inside Game has not started, initialized variables");
        makeComputerChooseWords();
        hasGameStarted = true;
        questionNumber = 5

    }

    if (hasGameStarted && askNextQuestion) {
        determineGameLevel(questionNumber);
        chooseWordForCurrentQuestion();
        askQuestionOnScreen();
        askNextQuestion = false;
        return;
    }
    // else{
    //     validateUserGuess();
    // }
}



// IF THE GAME HAS STARTED
//  CHECK IF GUESS COUNTER = 0, IF NO
//  Call validateUserGuess()     