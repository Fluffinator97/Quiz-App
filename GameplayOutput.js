/**
 * Prints user selected bots by creating DOM-elements.
 */
function printGameplay(minNumber, maxNumber) {
    updateNumberRange(minNumber, maxNumber);
    printSelectedBots();
    console.log('printgameplay', state.gameplayState.secretNumber, maxNumber)
}

/**
 * Completes the number range by printing the 'secret number' in the guess number field.
 */
function updateNumberRange(minNumber, maxNumber) {
    state.gameplayState.numberRange.classList.add('textshadow');
    state.gameplayState.numberRange.innerHTML = minNumber + " - " + maxNumber;
}

/**
 * Prints user selected bots by creating DOM-elements.
 */
function printSelectedBots() {
    state.newGameState.selectedBots.forEach(bot => {
        let botDiv = document.createElement('div');
        botDiv.classList.add('botDiv', bot);

        let img = document.createElement('img');
        img.classList.add('botImg');
        img.src = './assets/' + bot + '.svg';

        let botGuess = document.createElement('p');
        botGuess.classList.add('botGuess');
        botGuess.innerText = ". . .";

        let botResult = document.createElement('p');
        botResult.classList.add('botResult');

        if (state.newGameState.selectedBots.length > 3) {
            let botText = document.createElement('p');
            botText.classList.add('botText');
            botText.innerText = bot;
            botDiv.append(img, botText, botGuess, botResult);
        }

        else {
            botDiv.append(img, botGuess, botResult);
        }

        state.gameplayState.botContainer.append(botDiv);
    })
}

/**
 * Print gameplay info: bot names, bot guesses, bot results, user's guess.
 * @param {string} player - the player that guessed.
 * @param {number} guess - the player's guess as a number.
 * @param {string} result - the result from the player's guess.
 */
function printBotGuess(player, guess, result) {
    if (player != "Du") {
        let botGuessElement = document.querySelector('.' + player + ' .botGuess');
        let botResultElement = document.querySelector('.' + player + ' .botResult');
        botGuessElement.innerText = guess;
        botResultElement.innerText = result;
    }
    else if (player == "Du") {
        state.gameplayState.userGuess.innerHTML = "<p>" + guess + "</p><p>" + result + "</p>";
    }
}

function clearOnWin(winner, winnerScore) {
    state.gameplayState.stopTheGame = true;
    setTimeout(() => {
        toggleClass(state.gameoverState, 'hide');
    }, 2500);
    state.newGameState.selectedBots.forEach(bot => {
        console.log(winner)
        let score = document.createElement('p');
        score.classList.add('playerScore');

        if (bot != winner) {
            score.innerText = "[score]";
        }

        let img = document.createElement('img');
        img.classList.add('botImg');

        if (bot != "Du") {
            img.src = './assets/' + bot + '.svg';
        }

        let playerText = document.createElement('p');
        playerText.classList.add('botText');
        playerText.innerText = bot;

        let botDiv = document.createElement('div');

        if (bot != winner) {
            botDiv.classList.add('botDiv', bot);
            botDiv.append(img, playerText, score);
            state.gameoverState.botContainer.append(botDiv);
        }

        else if ("Du" === winner) {
            playerText.innerText = "[username]";
            score.innerText = winnerScore;
            console.log(score)
            state.gameoverState.winnerDiv.append(img, playerText, score);
        }

        else if (bot === winner) {
            playerText.innerText = bot + " won!";
            score.innerText = winnerScore;
            state.gameoverState.winnerDiv.append(img, playerText, winnerScore);
        }
    })
}   