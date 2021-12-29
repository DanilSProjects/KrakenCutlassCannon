let possiblePlays = ["ROCK", "PAPER", "SCISSORS"];
let combinations = [{win:"ROCK", lose:"SCISSORS"}, {win:"PAPER", lose:"ROCK"}, {win:"SCISSORS", lose:"PAPER"}]

// Functions for computer's turn + randomising it as much as possible
function computerPlay() {
    return possiblePlays[randomisePlay()];
}

function randomisePlay() {
    let randomNo = Math.random();
    let output = (randomNo >= 0.5) ? Math.floor(Math.random() * (possiblePlays.length - 1)) : Math.ceil(Math.random() * (possiblePlays.length - 1));
    return output
}

// Function for each round
function playRound(playerSelection, computerSelection) {
    // Cheap way to make input case insensitive
    playerSelection = playerSelection.toUpperCase();

    // Error handling
    if (!possiblePlays.includes(playerSelection)) {
        return "Error - you must input either rock, paper or scissors!";
    }
    
    // Cycle through each possible winning combination
    for (let i = 0; i < (combinations.length); i++) {
        if (playerSelection === combinations[i].win && computerSelection === combinations[i].lose) {
            return "You Win!";
        }
    }

    // If not winning, check for tie; otherwise lose
    if (playerSelection === computerSelection) {
        return "Tie!";
    } else {
        return "You Lose!";
    }
}