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
// available obstacles
const OBSTACLES = ["wall", "tree", "grass"];
const HELPER = ["hammer", "axe", "sickle"];
// available directions
const keyToArrow = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
};

/*-------------------------------- Variables --------------------------------*/
// for initial build, only one helper is available (hammer)
// in the future, more will be added
let currentDifficulty;
let currentHelper;
let roundCounter = 0;
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
// variable to store which div obstacle id to remove
let removeID;
// for event listener on the grid, we can utilise sqr class
let sqrElements;
// set variables on how many time can the helper be used
// based on HELPER = ["hammer", "axe", "sickle"];
let helperAvailability = [1, 1, 1];
// create a new variable for the state if any modal is open
let showModal = false;
// to pass in the current message
let currentMessage;
// let click = 0;
let currentModal = "";

/*------------------------ Cached Element References ------------------------*/
// play buttons
const startButton = document.querySelector(".start");
const helperButtons = document.querySelectorAll(".helper");
const arrowButtons = document.querySelectorAll(".arrow");
const roundElement = document.querySelector(".rounds-counter");
const informationButtons = document.querySelectorAll(".information");

// declare cached element references for the 2 grids : main and secondary
const mainGrid = document.querySelector(".main-grid");
const secGrid = document.querySelector(".secondary-grid");

// this is an empty container in game.html
const modalContainer = document.getElementById("modal-container");

/*-------------------------------- Functions --------------------------------*/
// function to generate grid based on difficulty variable set
const generateGrid = (gridSize) => {
    for (i = 0; i < gridSize * gridSize; i++) {
        // using innerHTML to simplify populating within the respective main and secondary grid div
        // using Tic Tac Toe homework as reference for grid structures
        // assigning id similar to the homework, in order to utilise event.target.id later on
        mainGrid.innerHTML += `<div class="sqr" id="main-${i}"></div>`;
        secGrid.innerHTML += `<div class="sqr" id="sec-${i}"></div>`;
    }
    sqrElements = document.querySelectorAll(".sqr");
};

// function to toggle modal
// set as async to wait for trigger
const toggleModal = async (button) => {
    try {
        if (modalContainer.innerHTML === "") {
            // fetch HTML files containing the existing modals (modals.html)
            // this will only work with live server in VSC
            // otherwise it will return CORS within console
            const response = await fetch("modals.html");
            const htmlText = await response.text();

            // use a tempDiv so as not to temper with the original HTML file
            // const tempDiv = document.createElement("div");
            // tempDiv.innerHTML = htmlText;

            // append to modal container in game.html
            modalContainer.innerHTML = htmlText;
        }

        // check for existing modal
        if (showModal === true) {
            modalContainer
                .querySelector(`#${currentModal}Modal`)
                .classList.add("hide");
        }

        // check if the button passed in is close
        if (button === "close") {
            modalContainer.classList.add("hide");
            showModal = false;
            return; // throw out of bounds
        }

        // find the modal based on the button class passed in
        const modalToShow = modalContainer.querySelector(`#${button}Modal`);

        if (button === "gameOver") {
            modalToShow.querySelector(".modal-title").textContent =
                currentMessage;
        }
        // throw out of bound if modal is not found
        if (!modalToShow) {
            console.error(`${button}Modal not found`);
            return;
        }

        modalContainer.classList.remove("hide");
        modalToShow.classList.remove("hide");
        currentModal = button;
        showModal = true;
    } catch (error) {}
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
                    gridType
                        .querySelector(`#${gridName}-${count}`)
                        .classList.add("player");
                    if (gridName === "main") {
                        gridType.querySelector(
                            `#${gridName}-${count}`
                        ).textContent = "P";
                        playerID = count;
                    }
                    if (gridName === "sec") {
                        gridType.querySelector(
                            `#${gridName}-${count}`
                        ).textContent = "NPC";
                        mirroredID = count;
                    }
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

// create separate function to randomise the obstacles rendered
const randomiseObstacles = () => {
    const obstacles = document.querySelectorAll(".obstacle");

    obstacles.forEach((obstacle) => {
        // randomise obstacles set
        const obsIndex = Math.floor(Math.random() * OBSTACLES.length);
        obstacle.classList.add(`${OBSTACLES[obsIndex]}`);

        // add image element within obstacle div
        const obstacleID = obstacle.getAttribute("id");
        // console.log(obstacleID);
        obstacle.innerHTML = `<img src="./assets/images/obstacles/pixel-${OBSTACLES[obsIndex]}.png" width="70px" height="70px" alt="obstacle : ${OBSTACLES[obsIndex]}" id="obs-${obstacleID}">`;
    });
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
        currentMessage = "No movement out of the grid allowed!";
        toggleModal("gameOver");
        return true; // out of bounds
    }

    // if obstacle is hit  in either main or secondary grid
    if (selectedMap[row][col] === 1 || mirroredMap[row][mCol] === 1) {
        currentMessage = "You have hit an obstacle!";
        toggleModal("gameOver");
        return true;
    }
};

// check if player reaches the goal
const checkGoalReached = (row, col) => {
    if (selectedMap[row][col] === 3) {
        // replace text within grid box to won
        mainGrid.querySelector(".goal").textContent = "Won!";
        secGrid.querySelector(".goal").textContent = "Won!";
        // add new class won for styling
        mainGrid.querySelector(".goal").classList.add("won");
        secGrid.querySelector(".goal").classList.add("won");

        // console.log("You have reached the goal!");
        hasWon = true;
        return true;
    }
};

// move player based on user input
// this is the main function for the play
const movePlayer = (direction) => {
    if (hasWon) {
        // console.log("You have won! No more move allowed!");
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
    }

    // check if player hits obstacle
    if (checkForObstacles(newRow, newCol, newMCol)) {
        return;
    }

    // check if goal is reached
    if (checkGoalReached(newRow, newCol)) {
        // update the last position of character before winning to blank
        mainGrid.querySelector(`#main-${playerID}`).textContent = "";
        secGrid.querySelector(`#sec-${mirroredID}`).textContent = "";
        // console.log("Game Won!");
        toggleModal("gameWon");
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
    // check if currentHelper or removeId is blank
    // check if game is won
    if (!currentHelper || !removeID || hasWon) return;

    if (removeID.startsWith("obs-")) {
        // remove the 'obs-' from removeID
        // this is because if the image is png and has some clear spaces
        // removeID may be obs-main-0 or main-0
        removeID = removeID.slice(4);
    }

    // only can destroy an obstacle in one grid at a time
    // either in main or grid or secondary grid
    const removeElement = document.getElementById(removeID);

    // derive the row and column based on removeID to update the mapArrays
    const [gridName, indexStr] = removeID.split("-");
    let gridType;
    // console.log(gridType); --> validated to return either main or sec!
    if (gridName === "main") {
        gridType = selectedMap;
    } else if (gridName === "sec") {
        gridType = mirroredMap;
    } else {
        return;
    }

    // conver index type from string to number
    const index = parseInt(indexStr);
    // the Math.floor() static method always rounds down and
    // returns the largest integer less than or equal to a given number
    const row = Math.floor(index / currentDifficulty);
    // console.log(row);
    // use remainder function to get the col value
    const col = index % currentDifficulty;

    // use the currentHelper variable
    // for future enhancements : certain helper can destroy specific obstacle
    const helperIndex = HELPER.indexOf(currentHelper);

    if (helperAvailability[helperIndex] > 0) {
        if (removeElement.classList.contains(OBSTACLES[helperIndex])) {
            // remove existing class related to obstacle
            removeElement.classList.remove("obstacle");
            removeElement.classList.remove(OBSTACLES[helperIndex]);
            removeElement.innerHTML = "";
            // update mapArray
            gridType[row][col] = 0;
            helperAvailability[helperIndex]--;
            // console.log(
            //     `${HELPER[helperIndex]} available : ${helperAvailability[helperIndex]}`
            // );
        }
    }
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
    // checker of showModal is available in the toggleModal function
    toggleModal("close");

    // continue the game
    roundCounter++;
    roundElement.textContent = roundCounter;
};

// render the game
const render = () => {
    updateGrid(selectedMap, mainGrid, "main");
    updateGrid(mirroredMap, secGrid, "sec");
    roundElement.textContent = roundCounter;
};

// reset the game
const resetGame = () => {
    // clear the grids
    mainGrid.innerHTML = "";
    secGrid.innerHTML = "";

    // reset all variables
    currentHelper = "";
    roundCounter = 0;
    hasWon = false;
    helperAvailability = [1, 1, 1];

    // resets player tracking variables
    playerID = undefined;
    mirroredID = undefined;
    playerRow = undefined;
    playerCol = undefined;

    // close existing modal if any
    toggleModal("close");

    // re-renders everything in the screen in regards to the game
    selectedMap = randomiseMap();
    mirroredMap = mirrorSelectedMap();
    locatePlayerInit();
    mirroredCol = mirroredMap[playerRow].indexOf(2);

    // regenerate grid with current difficulty
    generateGrid(currentDifficulty);
    render();
    randomiseObstacles();
    console.log("Game reset done!");
};

// initialise game
const init = () => {
    // console.log("Game initialised!");
    currentDifficulty = LEVEL_EASY;
    selectedMap = randomiseMap();
    // console.log(`selectedMap : ${selectedMap}`); --> validated correct map based on randomIndex pointed!
    mirroredMap = mirrorSelectedMap();
    // console.log(`mirroredMap : ${mirroredMap}`); --> validated selectedMap mirrored correctly
    locatePlayerInit();
    // assign mirroreCol variable
    mirroredCol = mirroredMap[playerRow].indexOf(2);
    // generate grid accordingly
    generateGrid(currentDifficulty);
    render();
    randomiseObstacles();
};

/*----------------------------- Event Listeners -----------------------------*/
// initialise the game when start button is clicked
init();

// movement controls : arrow buttons on screen or use keyboard arrows
arrowButtons.forEach((arrowButton) => {
    arrowButton.addEventListener("click", () => {
        const direction = arrowButton.dataset.direction;
        movePlayer(direction);
    });
});

// Reference : https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
// updated function to be more dynamic as the functions passed to switch-case is the same
document.addEventListener("keydown", (e) => {
    const arrow = keyToArrow[e.key];
    // console.log(arrow);  --> to check on the value
    if (arrow) {
        movePlayer(arrow);
        const button = document.querySelector(`.${arrow}`);
        button?.classList.add("hover");
    }
    // to check if the function is being triggered multiple times
    // console.log("KEYDOWN TRIGGERED", e.key); --> verified only triggered once per keydown
});

document.addEventListener("keyup", (e) => {
    const arrow = keyToArrow[e.key];
    if (arrow) {
        const button = document.querySelector(`.${arrow}`);
        button?.classList.remove("hover");
    }
});

// event listener when any of the helper is clicked
helperButtons.forEach((helperButton) => {
    helperButton.addEventListener("click", () => {
        // set the existing helper variable
        currentHelper = helperButton.dataset.helper;
        // console.log(currentHelper); --> validated that it is working!
    });
});

// set currentHelper by binding obstacles to the keyboard
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "1":
            currentHelper = HELPER[0];
            break;
        case "2":
            currentHelper = HELPER[1];
            break;
        case "3":
            currentHelper = HELPER[2];
            break;
    }
    // console.log(currentHelper); --> validated and correctly assigned!
});

// add event listener to the main grid
sqrElements.forEach((sqr) => {
    sqr.addEventListener("click", (e) => {
        if (currentHelper === undefined || currentHelper === "") {
            console.log("You must select a helper first!");
            return;
        }
        removeID = e.target.id;
        // console.log(removeID);   --> validated correct id assigned!
        removeObstacle();
    });
});

// add event listener for the existing information buttons
informationButtons.forEach((informationButton) => {
    informationButton.addEventListener("click", (e) => {
        // see what are the class name at index 1, and check the typeof return
        // console.log(e.target);
        if (e.target.classList.length > 1) {
            toggleModal(e.target.classList.item(1));
            e.stopPropagation();
        } else {
            toggleModal(e.target.classList.item(0));
            e.stopPropagation();
        }
    });
});

// event delegation within modals
// cannot use normal event listener as some buttons are added dynamically when modal is showing
modalContainer.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.matches(".close")) {
        // console.log(`click close : ${click++}`);
        toggleModal("close");
        // we can stop propagation
        // so as to make sure it does not bubble up
        e.stopPropagation();
    } else if (e.target.matches(".leaderboard")) {
        toggleModal("leaderboard");
        e.stopPropagation();
    } else if (e.target.matches(".continue")) {
        continueGame();
        e.stopPropagation();
    } else if (e.target.matches(".reset")) {
        resetGame();
        e.stopPropagation();
    } else if (e.target.matches(".home")) {
        window.location.href = "index.html";
    }
});
