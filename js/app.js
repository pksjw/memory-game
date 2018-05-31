
// Define global constants

const deck = document.getElementById('deck');
var openCards = [];

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function setupGame() {

// do stuff here
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

        // let's flip the card 

        if(event.target.classList.contains('match') ||
           event.target.classList.contains('open')  ||
           event.target.classList.contains('show')) {
           alert("The card is already flipped brains!");
        } else {
            event.target.classList.add('open', 'show');
            openCards.push(event.target);
            if(openCards.length === 2) {
                // is it a match?

                // no? then we close both cards and clear openCards

                // yes? then we remove open and show class and set match class on both cards and clear openCards

                // so either way open and show are removed and openCards is cleared
                isMatch(openCards);
                openCards = [];
                // console.log(openCards);
            }
            // isMatch() ? 
        }
    } else {
        // this is not an li which means it's not a card or its an open or matched card if it's an i or ul
    }

}, false);

function isMatch(cards) {
    // console.log(cards);
    // if the fa icons match then ..
    cards.forEach(function(card) {
        card.classList.remove('open', 'show');
        // card.classList.add('match');
    });
    // console.log(cards);
}



