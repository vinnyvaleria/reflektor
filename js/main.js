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
let playerID;
// for mirrored version of selected map
let mirroredMap = [];
let mirroredID;
// create a variable for the x and y of player position
let playerRow;
let playerCol;
// only require col for mirrored position
let mirroredCol;
// noticed that user can still move after game won
// create a state to check if game is won
let hasWon = false;

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
const updateGrid = (mapArray, gridType, gridName) => {
    // temporary counter, for id set in the sqr classes within each grid
    let count = 0;

    try {
        for (let row = 0; row < mapArray.length; row++) {
            for (let col = 0; col < mapArray[row].length; col++) {
                // refer to line 3 to 6 what 0-3 are for in the mapArray
                // to reset the grid to blank if value is 0
                if (mapArray[row][col] === 0) {
                    gridType.querySelector(
                        `#${gridName}-${count}`
                    ).textContent = "";
                }
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
                    gridType
                        .querySelector(`#${gridName}-${count}`)
                        .classList.add("player");
                    if (gridName === "main") playerID = count;
                    if (gridName === "sec") mirroredID = count;
                }
                // update content to X to indicate goal when value is 3
                if (mapArray[row][col] === 3) {
                    gridType
                        .querySelector(`#${gridName}-${count}`)
                        .classList.add("goal");
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

// locate the current location of the player after initiation
const locatePlayerInit = () => {
    // we do have the playerID, but that will be for populating the div correctly later on
    // we need this to get the x and y axis for player movement later on
    for (let row = 0; row < selectedMap.length; row++) {
        for (let col = 0; col < selectedMap[row].length; col++) {
            if (selectedMap[row][col] === 2) {
                playerRow = row;
                playerCol = col;
            }
        }
    }
};

// check if player hits an obstacle
const checkForObstacles = (row, col, mCol) => {
    // check for limits of the grid
    if (
        // go over top side of grid check
        row < 0 ||
        // go over bottom of grid check
        row >= selectedMap.length ||
        // go over left side of grid check
        col < 0 ||
        mCol < 0 ||
        // go over right side of grid check
        col >= selectedMap[row].length ||
        mCol >= mirroredMap[row].length
    ) {
        console.log("No movement out of the grid allowed!");
        return true; // out of bounds
    }

    // if obstacle is hit  in either main or secondary grid
    if (selectedMap[row][col] === 1 || mirroredMap[row][mCol] === 1) {
        console.log("You have hit an obstacle!");
        return true;
    }
};

// check if player reaches the goal
const checkGoalReached = (row, col, mCol) => {
    if (selectedMap[row][col] === 3) {
        mainGrid.querySelector(".goal").textContent = "Won!";
        secGrid.querySelector(".goal").textContent = "Won!";
        console.log("You have reached the goal!");
        hasWon = true;
        return true;
    }
};

// move player based on user input
const movePlayer = (direction) => {
    if (hasWon) {
        console.log("You have won! No more move allowed!");
        return;
    }

    // user in main grid will move on the correct direction
    let newRow = playerRow; // y-axis
    let newCol = playerCol; // x-axis
    let newMCol = mirroredCol;
    // console.log(mirroredCol);    --> validated correct index returned

    switch (direction) {
        // up = y-axis minus 1
        case "up":
            newRow--;
            break;
        // down = y-axis plus 1
        case "down":
            newRow++;
            break;
        // left = x-axis minus 1
        // mirrored to be opposite direction
        case "left":
            newCol--;
            newMCol++;
            break;
        // right = x-axis plus 1
        case "right":
            newCol++;
            newMCol--;
            break;
        default:
            break;
    }

    // check if player hits obstacle
    if (checkForObstacles(newRow, newCol, newMCol)) {
        return;
    }

    // check if goal is reached
    if (checkGoalReached(newRow, newCol, newMCol)) {
        mainGrid.querySelector(`#main-${playerID}`).textContent = "";
        secGrid.querySelector(`#sec-${mirroredID}`).textContent = "";
        console.log("Game Won!");
        return;
    }

    // update grid for main and secondary
    // set the value to 0 within each grid to indicate player has moved
    selectedMap[playerRow][playerCol] = 0;
    mirroredMap[playerRow][mirroredCol] = 0;
    // remove existing player class
    mainGrid.querySelector(`#main-${playerID}`).classList.remove("player");
    secGrid.querySelector(`#sec-${mirroredID}`).classList.remove("player");

    // set the value to 2 for the new position of player
    selectedMap[newRow][newCol] = 2;
    mirroredMap[newRow][newMCol] = 2;

    // update existing global variables on player x,y coordinates
    playerRow = newRow;
    playerCol = newCol;
    mirroredCol = newMCol;

    // re-render changes
    render();

    // user can continue or restarts game
};

// function for when helper is used
const removeObstacle = () => {
    // only can destroy an obstacle in one frid at a time
    // either in main or grid or secondaru grid
    // use the currentHelper variable
    // for future enhancements : certain helper can destroy specific obstacle
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
    updateGrid(selectedMap, mainGrid, "main");
    updateGrid(mirroredMap, secGrid, "sec");
};

// initialise game
const init = () => {
    console.log("Game initialised!");
    generateGrid(LEVEL_EASY);
    selectedMap = randomiseMap();
    // console.log(`selectedMap : ${selectedMap}`); --> validated correct map based on randomIndex pointed!
    mirroredMap = mirrorSelectedMap();
    // console.log(`mirroredMap : ${mirroredMap}`); --> validated selectedMap mirrored correctly
    locatePlayerInit();
    // assign mirroreCol variable
    mirroredCol = mirroredMap[playerRow].indexOf(2);
    render();
};

/*----------------------------- Event Listeners -----------------------------*/
// initialise the game when start button is clicked
// startButton.addEventListener("onclick", init);
init();
// movement controls : arrow buttons on screen or use keyboard arrows
arrowButtons.forEach((arrowButton) => {
    arrowButton.addEventListener("click", () => {
        const direction = arrowButton.dataset.direction;
        movePlayer(direction);
    });
});

// Reference : https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            movePlayer("up");
            break;
        case "ArrowDown":
            movePlayer("down");
            break;
        case "ArrowLeft":
            movePlayer("left");
            break;
        case "ArrowRight":
            movePlayer("right");
            break;
    }
});
