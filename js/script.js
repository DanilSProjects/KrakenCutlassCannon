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

    if (playerScore === 5 | computerScore === 5) {
        finishGame(playerScore, computerScore);
    }
}

function finishGame(playerScore, computerScore) {
    if (playerScore > computerScore) {
        pirateTalkPara.textContent = `Blimey, you've beaten me, you scallywag! I was going easy on you, ye know?`;
    } else {
        pirateTalkPara.textContent = `Har har har, I beat you! Better luck next time, chum!`
    }
    playerSelectButtons.forEach( (button) => {
        button.hidden = true;
    })
    let choiceButtonsDiv = document.querySelector('#choice_buttons');
    let replayButton = document.createElement('button');
    replayButton.textContent = "Play again?";
    replayButton.addEventListener('click', () => {
        choiceButtonsDiv.removeChild(replayButton);
        reset();
    });
    choiceButtonsDiv.appendChild(replayButton);
}

// Reset function, if player decides to play again
function reset() {
    playerSelectButtons.forEach( (button) => {
        button.hidden = false;
    })
    playerScore = 0;
    computerScore = 0;
    pirateTalkPara.textContent = "Ahoy, ye landlubber! Pick kraken, cutlass or cannon and fight me like a man, first to 5!";
    scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
}