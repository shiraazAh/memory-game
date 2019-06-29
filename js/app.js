/*
 * Create a list that holds all of your cards
 */
const diamond = '<li class="card"><i class="fa fa-diamond"></i></li>';
const plane = '<li class="card"><i class="fa fa-paper-plane-o"></i></li>';
const anchor = '<li class="card match"><i class="fa fa-anchor"></i></li>';
const bolt = '<li class="card match"><i class="fa fa-anchor"></i></li>';
const cube = '<li class="card"><i class="fa fa-cube"></i></li>';
const leaf = '<li class="card"><i class="fa fa-leaf"></i></li>';
const cycle = '<li class="card"><i class="fa fa-leaf"></i></li>';
const bomb = '<li class="card"><i class="fa fa-bomb"></i></li>';  


let arr = [diamond, plane, anchor, bolt, cube, leaf, cycle, bomb, diamond, plane, anchor, bolt, cube, leaf, cycle, bomb];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
shuffle(arr);
console.log(arr);

document.createElement('li')

const ul = document.querySelector(".deck")

for(i=0; i < arr.length; i++) {
    ul.insertAdjacentHTML('beforeend', arr[i]);
};

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

 function openCard(evt){
    evt.target.classList.toggle('open');
    evt.target.classList.toggle('show');
 }

document.querySelector(".deck").addEventListener('click', openCard);