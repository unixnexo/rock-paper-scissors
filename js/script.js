/**
 * play game
 */
const computerShowMove = document.getElementById('computer-show-move');
const userShowMove = document.getElementById('user-show-move');
const messageBox = document.getElementById('message-box');
const messageBoxBtn = document.querySelector('#message-box button');

// be aware that the path should be from the index.html not here
const rockImgUrl = './public/img/rock.webp';
const paperImgUrl = './public/img/paper.webp';
const scissorsImgUrl = './public/img/scissors.webp';

// initial state of contents
const threeDots = `<span class="loading loading-dots loading-lg"></span>`;
computerShowMove.innerHTML = threeDots;

const rockPaperScissors = `
    <img onclick="playGame('rock');" src="${rockImgUrl}" alt="rock" />
    <img onclick="playGame('paper');" src="${paperImgUrl}" alt="paper" />
    <img onclick="playGame('scissors');" src="${scissorsImgUrl}" alt="scissors" />`;
userShowMove.innerHTML = rockPaperScissors;


// show/hide message box
const showHideMessage = (message) => {
    messageBoxBtn.innerHTML = message;
    messageBox.classList.toggle('hide');
};

// play game
const wonResShow = document.getElementById('won-res');
const lostResShow = document.getElementById('lost-res');
const tieResShow = document.getElementById('tie-res');
let wonRes = parseInt(localStorage.getItem('wonRes')) || 0;
let lostRes = parseInt(localStorage.getItem('lostRes')) || 0;
let tieRes = parseInt(localStorage.getItem('tieRes')) || 0;

wonResShow.innerText = localStorage.getItem('wonRes') || 0;
lostResShow.innerText = localStorage.getItem('lostRes') || 0;
tieResShow.innerText = localStorage.getItem('tieRes') || 0;

// save and get from local storage
const savetoLocalStorage = (resShow, keyName) => {
    let res = parseInt(localStorage.getItem(keyName)) || 0;
    res += 1;
    localStorage.setItem(keyName, res.toString()); 
    resShow.innerText = res;
}

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
        savetoLocalStorage(tieResShow, 'tieRes');

    } else if (userMove === 'rock' && computerMove === 'scissors' || userMove === 'paper' && computerMove === 'rock' || userMove === 'scissors' && computerMove === 'paper') {
        showHideMessage(`<span class="text-emerald-700 font-bold">You win!</span> ${userMove} beats ${computerMove}.`);
        savetoLocalStorage(wonResShow, 'wonRes');

    } else if (userMove === 'rock' && computerMove === 'paper' || userMove === 'paper' && computerMove === 'scissors' || userMove === 'scissors' && computerMove === 'rock') {
        showHideMessage(`<span class="text-red-700 font-bold">You lose!</span> ${computerMove} beats ${userMove}.`);
        savetoLocalStorage(lostResShow, 'lostRes');

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


