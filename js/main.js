/*-------------------------------- Constants --------------------------------*/
// to prepare a fixed map for now, in the future can try to randomize
// 0 for nothing,
// 1 for obstacle,
// 2 for stating point of character,
// 3 for goal to reach
const mapOne_EASY = [
    [1, 1, 0, 0, 1],
    [0, 0, 0, 0, 3],
    [1, 0, 1, 1, 0],
    [0, 0, 0, 1, 1],
    [2, 1, 0, 0, 0],
];
const mapTwo_EASY = [
    [0, 0, 0, 1, 3],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [0, 0, 0, 2, 1],
];
const mapThree_EASY = [
    [1, 1, 0, 0, 1],
    [0, 0, 1, 3, 0],
    [2, 0, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1],
];
const maps_EASY = [mapOne_EASY, mapTwo_EASY, mapThree_EASY];
// diffculty constants for grid size
const LEVEL_EASY = 5;
const LEVEL_MEDIUM = 7;
const LEVEL_HARD = 9;

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
// declare cached element references for the 2 grids : main and secondary
const mainGrid = document.querySelector(".main-grid");
const secGrid = document.querySelector(".secondary-grid");

/*-------------------------------- Functions --------------------------------*/
// function to generate grid based on difficulty variable set
const generateGrid = (gridSize) => {
    for (i = 0; i < gridSize * gridSize; i++) {
        // using innerHTML to simplify populating within the respective main and secondary grid div
        // using Tic Tac Toe homework as reference for grid structures
        // assigning id similar to the homework, in order to utilise event.target.id later on
        mainGrid.innerHTML += `<di class="sqr" id="${i}"></div>`;
        secGrid.innerHTML += `<di class="sqr" id="${i}"></div>`;
    }
};

// randomise map used for the user to play
const randomiseMap = () => {
    // randomise map selected
    // assign to selectedMap var later to populate the obstacles in the grid
    const randomIndex = Math.floor(Math.random() * maps_EASY.length);
    // console.log(`randomIndex : ${randomIndex}`); --> validated to work!
    return maps_EASY[randomIndex];
};

// create a function to populate the grids with the obstacles
const populateGrid = () => {};

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
const init = () => {
    generateGrid(LEVEL_EASY);
    selectedMap = randomiseMap();
    // console.log(selectedMap); --> validated correct map based on randomIndex pointed!
};

// render the game
const render = () => {};

/*----------------------------- Event Listeners -----------------------------*/
// initialise the game when start button is clicked
// startButton.addEventListener("onclick", init);
// movement controls : arrow buttons on screen or use keyboard arrows
init();
