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
let currentHelper;
let roundCounter;
// const for selected map
let selectedMap = [];
// for mirrored version of selected map
let mirroredMap;

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
        mainGrid.innerHTML += `<di class="sqr" id="main-${i}"></div>`;
        secGrid.innerHTML += `<di class="sqr" id="sec-${i}"></div>`;
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

// mirror the selectedMap and store into var mirroredMap
const mirrorSelectedMap = () => {
    // for each row in the selectedMap, reverse the order (x-axis mirror)
    // use ...row otherwise the selectedMap will become reversed instead
    return selectedMap.map((row) => [...row].reverse());
};

// create a function to populate the grids with the obstacles
// 3 arguments to pass in, refer to renderr() on how to use
const populateGrid = (mapArray, gridType, gridName) => {
    // temporary counter, for id set in the sqr classes within each grid
    let count = 0;

    try {
        for (let row = 0; row < mapArray.length; row++) {
            for (let col = 0; col < mapArray[row].length; col++) {
                // refer to line 3 to 6 what 0-3 are for in the mapArray
                // add new class obstacle if the value in the mapArray is 1
                // console.log(`#${count}`); --> to check if the counter works
                if (mapArray[row][col] === 1) {
                    gridType
                        .querySelector(`#${gridName}-${count}`)
                        .classList.add("obstacle");
                }
                // update the text in div to P in grid if value is 2
                if (mapArray[row][col] === 2) {
                    gridType.querySelector(
                        `#${gridName}-${count}`
                    ).textContent = "P";
                }
                // update content to X to indicate goal when value is 3
                if (mapArray[row][col] === 3) {
                    gridType.querySelector(
                        `#${gridName}-${count}`
                    ).textContent = "X";
                }
                count++;
            }
        }
    } catch (error) {
        // in case any of arguments passed is incorrect
        // console.log(error);
    }
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

// render the game
const render = () => {
    populateGrid(selectedMap, mainGrid, "main");
    populateGrid(mirroredMap, secGrid, "sec");
};

// initialise game
const init = () => {
    console.log("Game initialised!");
    generateGrid(LEVEL_EASY);
    selectedMap = randomiseMap();
    // console.log(`selectedMap : ${selectedMap}`); --> validated correct map based on randomIndex pointed!
    mirroredMap = mirrorSelectedMap();
    // console.log(`mirroredMap : ${mirroredMap}`); --> validated selectedMap mirrored correctly
    render();
};

/*----------------------------- Event Listeners -----------------------------*/
// initialise the game when start button is clicked
// startButton.addEventListener("onclick", init);
// movement controls : arrow buttons on screen or use keyboard arrows
init();
