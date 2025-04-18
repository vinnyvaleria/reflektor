/*-------------------------------- Constants --------------------------------*/
// to prepare a fixed map for now, in the future can try to randomize
const mapOne = [];
const mapTwo = [];
const mapThree = [];

/*-------------------------------- Variables --------------------------------*/
// for initial build, only one helper is available (hammer)
// in the future, more will be added
var currentHelper;
var roundCounter;
// variable for selected map
var selectedMap = [];

/*------------------------ Cached Element References ------------------------*/
// all functional icons and buttons
const startButton = document.querySelector(".start-button");
const leaderboardButton = document.querySelector(".leaderboard-icon");
const resetButton = document.querySelector(".reset-icon");
const rulesButton = document.querySelector(".rules-icon");
const closeButton = document.querySelector(".close-icon");
const helperButtons = document.querySelectorAll(".helper");
const arrowButtons = document.querySelectorAll(".arrow");

/*-------------------------------- Functions --------------------------------*/
// randomise map used for the user to play
const randomiseMap = () => {
    // randomise map selected
    // assign to selectedMap var to populate the obstacles in the grid
};

// function for when helper is used
const removeObstacle = () => {
    // only can destroy an obstacle in one frid at a time
    // either in main or grid or secondaru grid
    // use the currentHelper variable
    // for future enhancements : certain helper can destroy specific obstacle
};

// move player based on user input
const movePlayer = () => {
    // user in main grid will move on the correct direction
    // user in secondary grid moves on the mirrorred direction (left = right, right = left)
    // if obstacle is hit  in either main or secondary grid,
    // user can continue or restarts game
};

// when the user loses
const gameOver = () => {
    // user can continue (round+1), restarts (round=0) or go back to home
};

// pause the game
const pauseGame = () => {
    // show the pause modal
    // pause the roundCounter
};

// continue the game
const continueGame = () => {
    // close the pause modal
    // continue the game
};

// reset the game
const resetGame = () => {};

// play the game
const playGame = () => {};

// initialise game
const init = () => {};

// render the game
const render = () => {};

/*----------------------------- Event Listeners -----------------------------*/
// initialise the game when start button is clicked
startButton.addEventListener("onclick", init); // will it clash with the onclick in index.html?
// movement controls : arrow buttons on screen or use keyboard arrows
