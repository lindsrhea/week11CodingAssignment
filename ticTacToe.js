// The logic of the game will be developed here!
const spaces = document.querySelectorAll(".space");

// there are two players, one for X and one for O
const Player_X = "X";
const Player_O = "O";

// to track turns using let since the turns change:
let turn = Player_X;

//to track the X's and O's:
const boardCondition = Array(spaces.lenth);
/* this array will be 9 spaces since there are 9 spaces on the
tic tac toe board */
boardCondition.fill(null);

//get elements in html from JavaScript:
//Elements:
const cross = document.getElementById("cross");
const gameOver = document.getElementById("game-over");
const gameOverMessage = document.getElementById("game-over-message");
const replay = document.getElementById("replay");

//Event listener:
spaces.forEach(space => space.addEventListener('click', spaceClick));
replay.addEventListener('click', () => refresh());

// hover text for the X's and O's
function hoverContent() {
    //to remove hover text:
    spaces.forEach((space) => {
        space.classList.remove("x-hover");
        space.classList.remove("o-hover");
    });

    const hoverType = `${turn.toLowerCase()}-hover`;

    spaces.forEach(space => {
        if (space.innerText == "") {
            space.classList.add(hoverType);
        }
    });
    console.log("From Hover Content: ", Array.from(spaces))
}

hoverContent();


//implement space click:
function spaceClick(event) {
    // if game over area is displayed you can't click the spaces:
    if (gameOver.classList.contains("visible")) {
        return;
    }

    //reference to html element that's clicked
    const space = event.target;

    //access space number:
    const spaceNumber = space.dataset.index;
    if (space.innerText != "") {
        return;
    }

    // turns for players and placeing the X's and O's into the spaces
    if (turn === Player_X) {
        space.innerText = Player_X;
        boardCondition[spaceNumber - 1] = Player_X;
        turn = Player_O;
    } else {
        space.innerText = Player_O;
        boardCondition[spaceNumber - 1] = Player_O;
        turn = Player_X;
    }

    hoverContent();
    determineTheWinner();
}


//determine the winner:
function determineTheWinner() {
    //to check for a winner:
    for (const outcome of winningOutcomes) {
        const { combination, crossThroughClass } = outcome;
        const spaceWorth1 = boardCondition[combination[0] - 1];
        const spaceWorth2 = boardCondition[combination[1] - 1];
        const spaceWorth3 = boardCondition[combination[2] - 1];

        if (
            spaceWorth1 != null &&
            spaceWorth1 === spaceWorth2 &&
            spaceWorth1 === spaceWorth3) {
                cross.classList.add(crossThroughClass);
                gameOverPopup(spaceWorth1);
                return;
            }
    }
    console.log("Board Condition: ", boardCondition)
    // console.log("What is space: ", space)
    //If there is a tie:

    const spaceFilled = Array.from(spaces).every((space) => space.innerText !== "");
    console.log("Space Filled: ", spaceFilled)
    if(spaceFilled) {
        gameOverPopup(null);
    }
}


function gameOverPopup(winnerMessage) {
    let text = "It's a Tie!";
    if (winnerMessage != null) {
        text = `The winner is ${winnerMessage}!`;
    }
    gameOver.className = "visible";
    gameOverMessage.innerText = text;
}

//determine the cross through's on board
const winningOutcomes = [
    /* what is the winning combonation and what strike through
    should be used */
    { combination: [1, 2, 3], crossThroughClass: "cross-row-1" },
    { combination: [4, 5, 6], crossThroughClass: "cross-row-2" },
    { combination: [7, 8, 9], crossThroughClass: "cross-row-3" },

    //for the columns:
    { combination: [1, 4, 7], crossThroughClass: "cross-column-1" },
    { combination: [2, 5, 8], crossThroughClass: "cross-column-2" },
    { combination: [3, 6, 9], crossThroughClass: "cross-column-3" },

    //implement diagonals:
    { combination: [1, 5, 9], crossThroughClass: "cross-diagonal-1" },
    { combination: [3, 5, 7], crossThroughClass: "cross-diagonal-2" },

];


function refresh () {
    window.location.reload();
}
