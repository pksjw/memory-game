
// Define global constants

const deck = document.getElementById('deck');
const restart = document.getElementById('restart');
let openCards = [];

/*
 * Create a list that holds all of your cards
 */
var cardPairs = ['fa-codepen', 'fa-codepen',
                 'fa-linux', 'fa-linux',
                 'fa-google', 'fa-google',
                 'fa-windows', 'fa-windows',
                 'fa-github', 'fa-github',
                 'fa-html5', 'fa-html5',
                 'fa-css3', 'fa-css3',
                 'fa-android', 'fa-android',
                ];

function buildCardDeck(theDeck) {
    theCards = document.createDocumentFragment();
    let li, i;
    theDeck.forEach(function(card){
        li = document.createElement('li');
        li.classList.add('card');
        li.setAttribute('data-card', card);
        i = document.createElement('i');
        i.classList.add('fa', card);
        li.appendChild(i);
        theCards.appendChild(li);        
    });
    return theCards;
}

function clearDeck() {
    while(deck.hasChildNodes()) {
        deck.removeChild(deck.lastChild);
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
    clearDeck(); 
    shuffle(cardPairs);
    deck.appendChild(buildCardDeck(cardPairs));
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

deck.addEventListener("click", function(event) {
    if(event.target.nodeName === "LI") {

// Let's flip the cards and have a look        

        if(event.target.classList.contains('match') ||
           event.target.classList.contains('open')  ||
           event.target.classList.contains('show')) {
        } else {
            event.target.classList.add('open', 'show');
            openCards.push(event.target);
            if(openCards.length === 2) {
                if(openCards[0].dataset.card === openCards[1].dataset.card) {
                   aMatch(openCards);
                } else {
                    window.setTimeout(() => closeCards(openCards, false), 850);
                }
            }
        }
    } else {
        // this is not an li which means it's not a card or its an open or matched card if it's an i or ul
    }
}, false);

restart.addEventListener("click", function(event) {
    // do what needs to be done to restart here
    closeCards(openCards, true);
    setupGame();

}, false);

function aMatch(cards) {
    cards.forEach(function(card) {
        card.classList.add('match');
        closeCards(cards, false);
    });
}

function closeCards(cards, match) {
    cards.forEach(function(card) {
        card.classList.remove('open', 'show');
        if(match) {card.classList.remove('match');}
     });
     openCards=[];

}
