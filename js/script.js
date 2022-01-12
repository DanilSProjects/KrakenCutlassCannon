// Variable setup
let pirateExposition = [
"Ahoy, landlubber! Had a good sleep? Har har!", 
"The name's Bill, cap'n o' the Jolly Barnacle. Most of me lads call me Crazy Bill, no clue why.",
"We're a whole family of friendly loot hunters and kindly murderers. Har har!",
"Ye're like enough wonderin' how ye got here. Doesn't matter.",
"What matters now is that your life hangs between the rum glass and the stomach, so to speak, laddie.",
"Normally we kill any prisoners we get our grubby hands on, but I'm pretty bored - these numbskulls on the ship are hardly any good company - and you seem a sturdy enough lad.",
"So, tell ye what - play a good game of Kraken, Cutlass, Cannon with me. If you win 5 rounds, you join the crew. If you lose, you get the privilege of walking the plank.",
"The rules are simple:",
"Kraken beats cannon - those slippery bastards rip cannons off the deck like meat off the bone.",
"Cutlass beats kraken - you land a clean hit into the eye and that hellhound won't be coming back for decades.",
'Cannon beats cutlass - as my pop used to say, "never bring a sabre to a cannon battle."',
"Easy enough? Great, let's begin!"
];
let winExposition = [
    "Blimey, you've beaten me, you scallywag! I was going easy on you, ye know?",
    "Well, I'm a man o' me word. I said that y'd get to join the crew if ye win.",
    "What can I say? Welcome aboard, lad!",
    "Your first order of duty: mopping the deck, har har!"
]
let loseExposition = [
    "Har har har, I beat you! Better luck next time, chum!",
    "Ah wait, I forgot, there won't be a next time, har har!",
    "Come on, lads, let's escort our lovely guest 'ere over to the plank!"
]
let possiblePlays = ["KRAKEN", "CUTLASS", "CANNON"];
let combinations = [{win:"KRAKEN", lose:"CANNON"}, {win:"CUTLASS", lose:"KRAKEN"}, {win:"CANNON", lose:"CUTLASS"}]
let playerScore = 0;
let computerScore = 0;

// DOM Setup for pirate talk + scores paragraphs
let pirateTalkPara = document.querySelector('#pirate_talk');
let scoresPara = document.querySelector('#scores');

// DOM Setup for rules
let rulesContainer = document.querySelector('#rules_container');

// DOM Setup for buttons
let choiceButtonsDiv = document.querySelector('#choice_buttons');
let playerSelectButtons = document.querySelectorAll("button.play");
playerSelectButtons.forEach( (button) => {
    button.addEventListener( 'click', (e) => {
        game(button.getAttribute("id"));
    })
})

function hover(element) {
    let buttonImage = document.querySelector(`#${element.getAttribute('id')}_image`);
    buttonImage.setAttribute('src', `./images/${element.getAttribute('id')}_white.png`);
}

function unhover(element) {
    let buttonImage = document.querySelector(`#${element.getAttribute('id')}_image`);
    buttonImage.setAttribute('src', `./images/${element.getAttribute('id')}.png`);
}

// Function for the exposition and beginning of the game
function beginExposition(pirateExposition, startOrEnd) {
    rulesContainer.style.display = "none";
    playerSelectButtons.forEach((button) => {
        button.style.display = "none";
    })

    // Button to continue exposition
    let continueButton = document.createElement('button');
    continueButton.textContent = "Continue";
    continueButton.classList.add('play');

    // Button to completely skip exposition
    let skipButton = document.createElement('button');
    skipButton.textContent = "Skip";
    skipButton.classList.add('play');

    let expositionIndex= 0;
    let expositionLimit = pirateExposition.length - 1;
    pirateTalkPara.textContent = pirateExposition[expositionIndex];
    
    // Click to advance exposition
    continueButton.addEventListener('click', () => {
        expositionIndex += 1;
        console.log(expositionIndex);
        console.log(expositionLimit);
        if (expositionIndex <= expositionLimit) {
            pirateTalkPara.textContent = pirateExposition[expositionIndex];
        } else {
            postExposition(startOrEnd, continueButton, skipButton);
        }
    });

    // Click to skip exposition
    skipButton.addEventListener('click', () => {
        postExposition(startOrEnd, continueButton, skipButton);
    }) 

    choiceButtonsDiv.appendChild(continueButton);
    choiceButtonsDiv.appendChild(skipButton);
}

function postExposition(startOrEnd, continueButton, skipButton) {
    choiceButtonsDiv.removeChild(continueButton);
    choiceButtonsDiv.removeChild(skipButton);
    if (startOrEnd === "start") {
        playerSelectButtons.forEach((button) => {
            button.style.display = "flex";
        })
        pirateTalkPara.textContent = "I'm going to drink you like rum, lad!";
        rulesContainer.style.display = "flex";
    } else if (startOrEnd === "end") {
        let currentText = pirateTalkPara.textContent;
        let currentExposition = [];
        if (winExposition.includes(currentText)) {
            currentExposition = winExposition;
        } else if (loseExposition.includes(currentText)) {
            currentExposition = loseExposition;
        }
        pirateTalkPara.textContent = currentExposition[currentExposition.length - 1];
        let replayButton = document.createElement('button');
        replayButton.textContent = "Play again?";
        replayButton.classList.add("replay");
        replayButton.addEventListener('click', () => {
            choiceButtonsDiv.removeChild(replayButton);
            reset();
        });
        choiceButtonsDiv.appendChild(replayButton);
    }
}

window.onload = beginExposition(pirateExposition, "start");

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

// Main game
function game(playerInput) {
    let computersPick = computerPlay()
    let output = playRound(playerInput, computersPick);
    switch (output) {
        case "WIN":
            playerScore += 1;
            pirateTalkPara.textContent = `Argh, ye got lucky, lad! I picked ${computersPick}.`;
            scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
            break;
        case "TIE":
            pirateTalkPara.textContent = `Blisterin' barnacles, it's a tie! I picked ${computersPick}.`;
            scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
            break;
        case "LOSE":
            computerScore += 1;
            pirateTalkPara.textContent = `Har har, I win! I picked ${computersPick}.`;
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
        beginExposition(winExposition, "end");
    } else {
        beginExposition(loseExposition, "end");
    }
    playerSelectButtons.forEach( (button) => {
        button.style.display = "none";
    })
}

// Reset function, if player decides to play again
function reset() {
    playerScore = 0;
    computerScore = 0;
    beginExposition(pirateExposition, "start");
    scoresPara.textContent = `Player: ${playerScore} | Captain Bill: ${computerScore}`;
}