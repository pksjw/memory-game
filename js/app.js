
// Define global constants

const restart = document.getElementById('restart');
const stars = document.querySelectorAll('.score-panel .fa-star');
const modal = document.getElementById('youWinModal');
const ulForModal = document.getElementById('ulForModal');

// Define globals

let openCards = []; // Thanks to Mike Wales
let moveCount = 0;
let matchCount = 0;
let gameTimerIntervalID = 0;
let seconds = 0;

function buildCardDeck(theDeck) {
    const deck = document.getElementById('deck');
    theCards = document.createDocumentFragment();
    let li, i;
    theDeck.forEach(function(card){
        li = document.createElement('li');
        li.classList.add('card');
        li.setAttribute('data-card', card); // Thanks to Mike Wales 
        i = document.createElement('i');
        i.classList.add('fa', card);
        li.appendChild(i);
        theCards.appendChild(li);        
    });
    return theCards;
}

function clearChildren(theParent) {
    while(theParent.hasChildNodes()) {
        theParent.removeChild(theParent.lastChild);
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

setupGame();
 
function setupGame() {
    const moves = document.getElementById('moves');
    const timer = document.getElementById('timer');
/*
 * Create a list that holds all of the cards
 */
    let cardPairs = ['fa-codepen', 'fa-codepen',
                     'fa-linux', 'fa-linux',
                     'fa-google', 'fa-google',
                     'fa-windows', 'fa-windows',
                     'fa-github', 'fa-github',
                     'fa-html5', 'fa-html5',
                     'fa-css3', 'fa-css3',
                     'fa-android', 'fa-android',
                    ];
    clearChildren(deck); 
    shuffle(cardPairs);
    deck.appendChild(buildCardDeck(cardPairs));
    moved(true);
    matchCount = 0;
    seconds = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function(event) {
    if(!gameTimerIntervalID) {
        gameTimerIntervalID = window.setInterval(() => {
            seconds += 1;
            displayTimer(timer);
            }, 1000);
    }
    if(event.target.nodeName === 'LI') {

// Let's flip the cards and have a look    

        if(event.target.classList.contains('match') ||
           event.target.classList.contains('open')  ||
           event.target.classList.contains('show')) {
        } else {
            event.target.classList.add('open', 'show');
            openCards.push(event.target);
            /* Process cards in pairs. css is used to disallow clicking more than two cards */
            if(openCards.length === 2) {
                deck.classList.add('no-click');
                moved();
                starRating();
                if(openCards[0].dataset.card === openCards[1].dataset.card) {
                    for(let i = 0; i < 2; i++) { openCards[i].classList.add('match'); }     
                    closeCards();
                    matchCount += 1;               
                    if(matchCount === 8) { gameWon(); }
                } else {
                    window.setTimeout(() => closeCards(), 800);
                }
            }
        }
    } else {
        // this is not an li which means it's not a card or its an open or matched card if it's an i or ul
    }
}, false);

restart.addEventListener('click', event => { restartGame(); }, false);

function restartGame() {
    openCards = [];
    for(let i = 0; i <=4; i++) {starChange(i, "f");}
    window.clearInterval(gameTimerIntervalID);
    seconds = 0;
    displayTimer(timer);
    setupGame();
}

window.addEventListener('click', event => { if(event.target == modal){ closeModal(); } });

document.getElementById('modalClose').addEventListener('click', event => { closeModal(); });

document.getElementById('again').addEventListener('click', event => {
     closeModal();
     restartGame();
}, false);

function closeCards() {
    for(let i = 0; i < 2; i++) { openCards[i].classList.remove('open', 'show'); }
    openCards.splice(0,2);
    deck.classList.remove('no-click');
}

function moved(reset) {
    reset ? moveCount=0 : moveCount +=1;
    // moves.innerText = moveCount;
    moves.innerText =  `${moveCount.toString().padStart(2, "0")}`;   
}

function starRating() {
    switch(moveCount) {
        case 12:
            starChange(4, 'h');
            break;
        case 14:
            starChange(4, 'e');
            break;
        case 16:
            starChange(3, 'h');
            break;
        case 17:
            starChange(3, 'e');
            break;
        case 19:
            starChange(2, 'h');
            break;
        case 20:
            starChange(2, 'e');
            break;
        case 22:
            starChange(1, 'h');
            break;
        case 23:
            starChange(1, 'e');
            break;
    }
}

// flag = h - half, e - empty or any other value - full star

function starChange(star, flag){
    stars[star].classList.remove('fa-star', 'fa-star-half-o', 'fa-star-o');
    stars[star].classList.add(flag === 'h' ? 'fa-star-half-o' :
                              flag === 'e' ? 'fa-star-o' : 'fa-star');
}

function displayTimer(location) {
    location.innerText = `${(Math.floor(seconds / 60)).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function gameWon() {
    window.clearInterval(gameTimerIntervalID);
    gameTimerIntervalID = 0;
    stars.forEach(function(star) {
        let el = star.parentElement.cloneNode(true);
        ulForModal.appendChild(el);
    });
    const winTime = document.getElementById('winTime');
    displayTimer(winTime);
    modal.classList.add('modal-display', 'fly-in');
}

function closeModal() {
    modal.classList.remove('modal-display');
    clearChildren(ulForModal);
}