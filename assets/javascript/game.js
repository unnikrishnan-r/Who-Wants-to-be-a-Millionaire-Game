/*********************************************************************************
 **********************VARIABLE DECLARATIONS HERE********************************** 
 *********************************************************************************/
//Variables to map values back to screen
var winsText = document.getElementById("winsText");
var lossesText = document.getElementById("lossesText");

var currentWordText = document.getElementById("currentWordText");
var guessesLeftText = document.getElementById("guessesLeftText");
var lettersGuessedSoFarText = document.getElementById("lettersGuessedSoFarText");

var submitButton = document.getElementById("submitButton");
var restartButton = document.getElementById("restartButton");
var continueButton = document.getElementById("continueButton");


// Array with master list of simple medium and complex words
var simpleWordsArray = ['lion', 'cat', 'fish', 'tiger', 'dog', "horse", "bear", "camel", "fox", "wolf"];
var mediumWordsArray = ['snake', 'zebra', 'mouse', 'spider', 'donkey', 'monkey', 'squirel', 'turtle', 'lizard', 'word10'];
var complexWordsArray = ['comp1', 'comp2', 'comp3', 'comp4', 'comp5', 'comp6', 'comp7', 'comp8', 'comp9']

//Game State
var hasGameStarted = false;
var askNextQuestion = true;

//Button Controls
var enableStartButton = true;
var enableRestartButton = true;
var enableContinueButton = true;

//Counter Variables
var totalGuess = 100;
var winCounter = 0;
var lossCounter = 0;
var totalPriceMoney = 0;
var correctGuessCounter = 0;

//Index Variables
var i = 0;

//Game Constants
var totalQuestionsInGame = 5;
var simpleWordsToBeAsked = 3;
var mediumWordsToBeAsked = 1;
var complexWordsToBeAsked = 1;

//Game Variables
var questionNumber = 0;
var gameLevel;
var wordInPlay;
var keyPressed;
var userGuessedCorrect = false;

var randomNumber = 0;
var userGuess = [];
var currentWord = [];
var computerWord = [];


/*********************************************************************************
 **********************OBJECT DECLARATIONS HERE************************************ 
 *********************************************************************************/
//Object with arrays are members. Arrays are based on level of game
//Object for storing current game questions:
var currentGameQuestions = {
    simpleWordsChosen: [],
    mediumWordsChosen: [],
    complexWordsChosen: []
}

/*********************************************************************************
 **********************FUNCTIONS DEFINED HERE************************************** 
 *********************************************************************************/

// Function to initialize variables during start/restart of the game
function initializeVariables() {
    winCounter = 0;
    lossCounter = 0;
    totalPriceMoney = 0;
    correctGuessCounter = 0
    hasGameStarted = true;
    askNextQuestion = true;
    questionNumber = 1;
    randomNumber = 0;
    userGuess = [];
    currentWord = [];
    computerWord = [];
    console.log(currentGameQuestions);
    currentGameQuestions = {
        simpleWordsChosen: [],
        mediumWordsChosen: [],
        complexWordsChosen: []
    }
    console.log(currentGameQuestions);
    userGuessedCorrect = false;
    wordInPlay = ' ';
    gameLevel = ' ';
}

/*Function to start game ; calls functions to perform
    - Computer to pick random words - Simple, Medium, Complex from the Master array
    - Take the game forward
    - Handle button states
*/
function startGame() {
    initializeVariables();
    makeComputerChooseWords();
    continueGame();

    enableStartButton = false;
    enableRestartButton = true;
    handleButtonStates();
    return;
    // handleButtonStates ("submitButton", "btn-primary", "remove");
}

/* Function to continue to Next Question with in a game
    - Determine game level (Simple, Medium, Complex) and chooses the word
 */
function continueGame() {
    determineGameLevel(questionNumber);
    chooseWordForCurrentQuestion();
    askQuestionOnScreen();
    askNextQuestion = false;
    return;

}

/*Makes Computer choose words for current game
  Based on game constant values (# of questions), this function chooses random words for each level
*/
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
    // console.log(currentGameQuestions);
    // console.log("Computer has chosen " + totalQuestionsInGame + " words");
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

    computerWord = [];
    if (gameLevel == 'simple') {
        wordInPlay = currentGameQuestions.simpleWordsChosen[questionNumber - 1];
    } else if (gameLevel == 'medium') {
        wordInPlay = currentGameQuestions.mediumWordsChosen[questionNumber - simpleWordsToBeAsked - 1];
    } else {
        wordInPlay = currentGameQuestions.complexWordsChosen[questionNumber - simpleWordsToBeAsked - mediumWordsToBeAsked - 1];
    }
    for (i = 0; i < wordInPlay.length; i++) {
        computerWord[i] = wordInPlay[i];
    }
    console.log("Word to be Guessed is: " + wordInPlay);
    // console.log(computerWord);


}

//Render the question on the screen
// Initialize variables Question, Current Word, Guesses So far, Guesses Left
// Accept Question Number as Argument
// Access object and obtain question, answer and price money
// Throw information on the screen
function askQuestionOnScreen() {
    currentWord = [];
    userGuess = [];
    totalGuess = wordInPlay.length * 2;
    correctGuessCounter = 0;

    for (i = 0; i <= wordInPlay.length - 1; i++) {
        currentWord[i] = '_';
    }

    guessesLeftText.textContent = totalGuess;
    winsText.textContent = winCounter;
    currentWordText.textContent = currentWord;
    lettersGuessedSoFarText.textContent = userGuess;

    document.querySelector("#questionNumber").innerHTML = wordInPlay;
    document.querySelector("#computerMadeItsChoice").innerHTML = "Computer made its choice, start your guess";

    enableContinueButton = false;
    handleButtonStates();
}

/*Validate user's guess
*/
function validateUserGuess() {
    if (computerWord.indexOf(keyPressed) != -1) {
        userGuessedCorrect = true;
        processCorrectGuess();
    } else {
        userGuessedCorrect = false;
        processIncorrectGuess();
    }
    currentWordText.textContent = currentWord;
    guessesLeftText.textContent = totalGuess;
    lettersGuessedSoFarText.textContent = userGuess;
    winsText.textContent = winCounter;
    lossesText.textContent = lossCounter;
}

//Function to handle succesfull guess by user
function processCorrectGuess() {
    currentWord[computerWord.indexOf(keyPressed)] = keyPressed;
    correctGuessCounter++;
    totalGuess--;

    if (correctGuessCounter == computerWord.length) {
        winCounter++;
        handleWinLoss();
    } else if (totalGuess == 0) {
        lossCounter++;
        handleWinLoss();
    }
}

/* Function to handle incorrect guess
   - If Letter already guessed, do noting
   - If new letter - Display the guess on screen, decrement counter etc
*/
function processIncorrectGuess() {
    if (userGuess.indexOf(keyPressed) == -1) {

        totalGuess--;
        userGuess.push(keyPressed);
        guessesLeftText.textContent = totalGuess;
        if (totalGuess == 0) {
            lossCounter++;
            questionNumber++;
            askNextQuestion = true;
            handleWinLoss();
        }
    } else {
        console.log("Letter already guessed");
    }
}

// Function to handle enabling and disabling of Start, Restart and Next Question Button
function handleButtonStates() {


    if (!enableStartButton) {
        submitButton.setAttribute("disabled", true);
        submitButton.classList.remove("btn-primary");
        submitButton.classList.add("btn-secondary");
    }

    if (enableRestartButton) {
        restartButton.removeAttribute("disabled");
        restartButton.classList.remove("btn-secondary");
        restartButton.classList.add("btn-primary");

    }

    if (!enableContinueButton) {
        continueButton.setAttribute("disabled", "true");
        continueButton.classList.remove("btn-primary");
        continueButton.classList.add("btn-secondary");

    }
    else{
        continueButton.removeAttribute("disabled");
        continueButton.classList.remove("btn-secondary");
        continueButton.classList.add("btn-primary");

    }
    // if (action === "remove"){

    //     buttonName.classList.remove(buttonClass);
    // }


}

//Function to handle Win or Loss Scenario
function handleWinLoss() {
    questionNumber++;
    askNextQuestion = true;
    if (questionNumber <= totalQuestionsInGame) {
        enableContinueButton = true;
        handleButtonStates();
    } else {
        document.querySelector("#computerMadeItsChoice").innerHTML = "GAME OVER";
        return;
    }


}
/*********************************************************************************
 ***************************MAIN PROCESS HERE************************************** 
 *********************************************************************************/


// CAPTURE THE KEY STROKE EVENT
// document.querySelector("#computerMadeItsChoice").innerHTML = "Press any key to start the game";
submitButton.addEventListener("click", startGame);

restartButton.addEventListener("click", startGame);

continueButton.addEventListener("click", continueGame);

document.onkeyup = function (event) {
    keyPressed = event.key.toLowerCase();
    if (hasGameStarted && !askNextQuestion) {
        validateUserGuess();
    }
}