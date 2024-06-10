/**
 * play game
 */
const computerShowMove = document.getElementById('computer-show-move');
const userShowMove = document.getElementById('user-show-move');
const messageBox = document.getElementById('message-box');
const messageBoxBtn = document.querySelector('#message-box button');

const rockImgUrl = '../public/img/rock.png';
const paperImgUrl = '../public/img/paper.png';
const scissorsImgUrl = '../public/img/scissors.png';

// initial state of contents
const threeDots = `<span class="loading loading-dots loading-lg"></span>`;
computerShowMove.innerHTML = threeDots;

const rockPaperScissors = `
    <img onclick="playGame('rock');" src="./public/img/rock.png" alt="rock" />
    <img onclick="playGame('paper');" src="./public/img/paper.png" alt="paper" />
    <img onclick="playGame('scissors');" src="./public/img/scissors.png" alt="scissors" />`;
userShowMove.innerHTML = rockPaperScissors;


// show/hide message box
const showHideMessage = (message) => {
    messageBoxBtn.innerHTML = message;
    messageBox.classList.toggle('hide');
};

// play game
let computerMove;
const playGame = (userMove) => {

    // generate computer move
    const randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
        computerShowMove.innerHTML = `<img src="${rockImgUrl}" alt="${computerMove}" />`;
    } else if (randomNumber >= 1/3 && randomNumber <= 2/3) {
        computerMove = 'paper';
        computerShowMove.innerHTML = `<img src="${paperImgUrl}" alt="${computerMove}" />`;
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'scissors';
        computerShowMove.innerHTML = `<img src="${scissorsImgUrl}" alt="${computerMove}" />`;
    }

    // show user move
    if (userMove === 'rock') {
        userShowMove.innerHTML = `<img src="${rockImgUrl}" alt="${userMove}" />`;
    } else if (userMove === 'paper') {
        userShowMove.innerHTML = `<img src="${paperImgUrl}" alt="${userMove}" />`;
    } else if (userMove === 'scissors') {
        userShowMove.innerHTML = `<img src="${scissorsImgUrl}" alt="${userMove}" />`;
    }

    // check who won
    if (userMove === computerMove) {
        showHideMessage(`<span class="text-yellow-500 font-bold">It's a tie!</span> Both chose ${userMove}.`);

    } else if (userMove === 'rock' && computerMove === 'scissors' || 
                 userMove === 'paper' && computerMove === 'rock' || 
                 userMove === 'scissors' && computerMove === 'paper') {
        showHideMessage(`<span class="text-emerald-700 font-bold">You win!</span> ${userMove} beats ${computerMove}.`);

    } else if (userMove === 'rock' && computerMove === 'paper' || 
                 userMove === 'paper' && computerMove === 'scissors' || 
                 userMove === 'scissors' && computerMove === 'rock') {
        showHideMessage(`<span class="text-red-700 font-bold">You lose!</span> ${computerMove} beats ${userMove}.`);

    } else {
        showHideMessage('Invalid move! Please choose rock, paper, or scissors.');
    }

    setTimeout(() => {
        restartGame();
    }, 1000);
    
};


// close the message box and restart the game
const restartGame = () => {
    messageBox.classList.add('hide');
    // content to initial state
    userShowMove.innerHTML = rockPaperScissors;
    computerShowMove.innerHTML = threeDots;
};



/**
 * theme into local storage
*/
const themeDropdownItems = document.querySelectorAll('[name="theme-dropdown"]');

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', theme);

    // active the ui based on the local storage theme 
    themeDropdownItems.forEach(item => {
        if (item.value === theme) {
            item.classList.add('btn-active');
        }
    });
});

themeDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        localStorage.setItem('theme', item.value);

        // to remove the active ui from others and then apply it to the clicked one
        themeDropdownItems.forEach(i => i.classList.remove('btn-active'));
        item.classList.add('btn-active');
    });
});




///////// test


