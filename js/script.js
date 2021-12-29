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
        return "ERROR";
    }
    
    // Cycle through each possible winning combination
    for (let i = 0; i < (combinations.length); i++) {
        if (playerSelection === combinations[i].win && computerSelection === combinations[i].lose) {
            return "WIN";
        }
    }

    // If not winning, check for tie; otherwise lose
    if (playerSelection === computerSelection) {
        return "TIE";
    } else {
        return "LOSE";
    }
}

// Main game
function game() {
    let maxRounds = 5;
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < maxRounds;) {
        let playerInput = prompt("Let's play for 5 rounds! Choose: rock, paper or scissors?");
        let output = playRound(playerInput, computerPlay());

        switch (output) {
            case "WIN":
                playerScore += 1;
                i += 1;
                alert(`You win!\n\nCurrent scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}`);
                break;
            case "TIE":
                alert(`Tie!\n\nCurrent scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}`);
                break;
            case "LOSE":
                computerScore += 1;
                i += 1;
                alert(`You lose!\n\nCurrent scores:\nPlayer: ${playerScore}\nComputer: ${computerScore}`);
                break;
            case "ERROR":
                alert("Error - please input only rock, paper or scissors.");
                break;
            default:
                alert("Something has gone terribly wrong. Try again!")
                break;
        }
    }

    finishGame(playerScore, computerScore);
}

function finishGame(playerScore, computerScore) {
    alert(playerScore)
    alert(computerScore)
}