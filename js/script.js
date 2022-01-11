let possiblePlays = ["KRAKEN", "CUTLASS", "CANNON"];
let combinations = [{win:"KRAKEN", lose:"CANNON"}, {win:"CUTLASS", lose:"KRAKEN"}, {win:"CANNON", lose:"CUTLASS"}]
let playerScore = 0;
let computerScore = 0;

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

// DOM Setup for buttons
let playerSelectButtons = document.querySelectorAll("button");
playerSelectButtons.forEach( (button) => {
    button.addEventListener( 'click', (e) => {
        game(button.getAttribute("id"));
    })
})

// DOM Setup for pirate talk + scores paragraphs
let pirateTalkPara = document.querySelector('#pirate_talk');
let scoresPara = document.querySelector('#scores');

// Main game
function game(playerInput) {
    let output = playRound(playerInput, computerPlay());
    switch (output) {
        case "WIN":
            playerScore += 1;
            pirateTalkPara.textContent = `Argh, ye got lucky, lad!`;
            scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
            break;
        case "TIE":
            pirateTalkPara.textContent = `Blisterin' barnacles, it's a tie!`;
            scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
            break;
        case "LOSE":
            computerScore += 1;
            pirateTalkPara.textContent = `Har har, I win!`;
            scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
            break;
        default:
            console.log("Something has gone terribly wrong. Try again!");
            break;
    }

    //finishGame(playerScore, computerScore); -> commented until fixed
}

function finishGame(playerScore, computerScore) {
    if (playerScore > computerScore) {
        alert(`Congratulations, you've beaten me, ${playerScore}:${computerScore}! I was going easy on you, ya know?`);
    } else {
        alert(`Haha, I beat you ${computerScore}:${playerScore}! Better luck next time!`);
    }

    let confirmRepeat = confirm("Play again?");
    if (confirmRepeat) {
        game();
    }
}