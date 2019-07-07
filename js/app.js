// function and data for the Main game 
const gameDataController = (function() {

    let currentCard = []; //Card name is stored to compare
    let currentCardClass = []; // Id of the stored card is stored
    // Timer seconad and minute is stored
    let sec = 0;
    let min = 0;
    //number of moves is stored
    let moves = 0;
    
    // function to clear the card data stored array
    function avoid() {
        currentCard.length = 0;
        currentCardClass.length = 0;
    }
    // function to be called when two cards match
    function matchCard() {
        document.getElementById(currentCard[0]).classList.remove('open');
        document.getElementById(currentCard[1]).classList.remove('open');
        document.getElementById(currentCard[0]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.add('match');
        document.getElementById(currentCard[0]).classList.add('match');
        avoid();
    }
    // function to be called when two cards do not match
    function notMatchCard() {
        document.getElementById(currentCard[0]).style.pointerEvents="auto";
        document.getElementById(currentCard[1]).style.pointerEvents="auto";
        document.querySelector(".deck").style.pointerEvents="auto"
        document.getElementById(currentCard[0]).classList.remove('unmatch');
        document.getElementById(currentCard[1]).classList.remove('unmatch');
        document.getElementById(currentCard[0]).classList.remove('open');
        document.getElementById(currentCard[1]).classList.remove('open');
        document.getElementById(currentCard[0]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.remove('show');
        avoid();
    }

    return {
        //Function to store card value
        storeCardValue: function(evt) {
            currentCardClass.push(evt.target.firstChild.classList[1]);
            currentCard.push(evt.target.id);
            evt.target.style.pointerEvents="none"; //To avoid double clicking the same card
        },
        //Function to check if stored two cards match
        checkCurrent: function() {
                if(currentCardClass[0]===currentCardClass[1] && currentCard[0] !== currentCard[1]){
                    matchCard(); // If matched
                }
                 else if(currentCard.length > 1 && document.getElementById(currentCard[0]).classList.contains('open') && document.getElementById(currentCard[1]).classList.contains('open') && currentCardClass[0]!==currentCardClass[1]) {
                    this.ifTwoCards(); //Add red colour to the cards (unmatched class) for 0.3 seconds 
                    setTimeout(notMatchCard, 300); //If not matched 
                }
        },
        //Function to calculate the number of moves
        moveCounter: function() {
            //moved every time user clicks two cards
            if(currentCard.length > 1) {
                ++moves;
            }
            document.querySelector(".moves").textContent = moves; //Added to the UI
        },
        //Function to remove stars
        moveStars: function() {
            // if below 8 moves 3 star, if below 16 moves two star , else one star
            if(currentCard.length > 1 && (moves == 8 || moves == 16) ){
                document.querySelector(".stars").getElementsByTagName('li')[0].remove(); //remove star from the main game
                document.querySelector(".stars-2").getElementsByTagName('li')[0].remove(); //remove star from the modal
            }
        },
        //Function to be called after user wins the game
        winGame: function() {
            let matchedCards = document.querySelectorAll(".match").length;
            // if all the 16 cards are matched 
            if(matchedCards === 16) {
                this.hideCards(); //hide all cards to show the modal
                this.modalStyle(); //Adding style and text to the modal after winning
                document.getElementById('timer').style.display = "none";
            }
        },
        //Function for timer
        startTimer: function() {
                sec++;
                if (sec > 59) {
                    sec = 0;
                    min++;
                }
                document.getElementById('timer').textContent = min + ":" + sec; //Adding the timer to the UI
        },
        // function to add red colour to the cards (unmatched class) and not allow to click anyother cards for that moment
        ifTwoCards: function() {
            document.querySelector(".deck").style.pointerEvents="none";
            document.getElementById(currentCard[0]).classList.add('unmatch');
            document.getElementById(currentCard[1]).classList.add('unmatch');
        },
        // function to add style and text to the modal after winning
        modalStyle: function() {
            document.querySelector(".deck").style.justifyContent = "center";
            document.querySelector(".modal").style.display = "block";
            document.querySelector(".timer").textContent = min + " Minutes And " + sec + " Seconds";
            document.querySelector(".moves-2").textContent = "And " + moves + " Moves";

        },
        //funtion to hide all cards to show the modal
        hideCards: function() {
            var cardsToHide = document.getElementsByClassName("card"); //divsToHide is an array
            for(var i = 0; i < cardsToHide.length; i++){// or
                cardsToHide[i].style.display = "none"; // depending on what you're doing
            }
        }

    }

})();

// functions and data related to the User inteface (Like adding cards etc.)
const UIController = (function() {
    
    //Cards
    const diamond = '<li class="card" id="1"><i class="fa fa-diamond"></i></li>';
    const plane = '<li class="card" id="2"><i class="fa fa-paper-plane-o"></i></li>';
    const anchor = '<li class="card" id="3"><i class="fa fa-anchor"></i></li>';
    const bolt = '<li class="card" id="4"><i class="fa fa-bolt"></i></li>';
    const cube = '<li class="card" id="5"><i class="fa fa-cube"></i></li>';
    const leaf = '<li class="card" id="6"><i class="fa fa-leaf"></i></li>';
    const cycle = '<li class="card" id="7"><i class="fa fa-bicycle"></i></li>';
    const bomb = '<li class="card" id="8"><i class="fa fa-bomb"></i></li>';  
    const diamond2 = '<li class="card" id="9"><i class="fa fa-diamond"></i></li>';
    const plane2 = '<li class="card" id="10"><i class="fa fa-paper-plane-o"></i></li>';
    const anchor2 = '<li class="card" id="11"><i class="fa fa-anchor"></i></li>';
    const bolt2 = '<li class="card" id="12"><i class="fa fa-bolt"></i></li>';
    const cube2= '<li class="card" id="13"><i class="fa fa-cube"></i></li>';
    const leaf2= '<li class="card" id="14"><i class="fa fa-leaf"></i></li>';
    const cycle2 = '<li class="card" id="15"><i class="fa fa-bicycle"></i></li>';
    const bomb2 = '<li class="card" id="16"><i class="fa fa-bomb"></i></li>'; 

    //Cards put into array
let arr = [diamond, plane, anchor, bolt, cube, leaf, cycle, bomb, diamond2, plane2, anchor2, bolt2, cube2, leaf2, cycle2, bomb2];

return {
    //Function to shuffle cards 
    shuffle: function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    },
    // Function to add the cards to the UI
    addCardToUI: function() {
        document.createElement('li')

        const ul = document.querySelector(".deck")

        for(i=0; i < arr.length; i++) {
            ul.insertAdjacentHTML('beforeend', arr[i]);
        };
    },
    //Function to open the cards (basically add the class 'open' and 'show' to the clicked card)
    openCard: function(evt) {
        evt.target.classList.add('open');
        evt.target.classList.add('show');
    },
    //Function to return array of which the cards are stored so it can be called
    getArray: function() {
        return arr;
    }
}

})();

//This is for calling functions and adding eventListeners
const controller = (function(game, UI) {
    //array of which the cards are stored
    let cards = UI.getArray()

const setCards = function (){

        // shuffle the list of cards using the provided "shuffle" method below
        UI.shuffle(cards);
        // Display the cards on the page and loop through each card and create its HTML and add each card's HTML to the page
        UI.addCardToUI();
}

//  set up the event listener for a card.
const setEventListener = function() {
    document.querySelector(".deck").addEventListener('click', addStuff) //Event listener to call necessary functions
}

const addStuff = function(evt) {
//    - display the card's symbol (put this functionality in another function that you call from this one)
    UI.openCard(evt);
//    - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    game.storeCardValue(evt);
//    - if the list already has another card, check to see if the two cards match
//      (done above and called in this function) if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//      (done above and called in this function) if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    game.checkCurrent();
//      + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    game.moveCounter();
//      + remove stars according to the no.of moves
    game.moveStars();
//      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    game.winGame();
}

return {
    //function for setting all the basic functions
    init: function() {
        console.log("Game Has started")
        setCards(); //Set the cards on the deck
        setEventListener(); //Set the event listener
        setInterval(game.startTimer, 1000); //Set the timer
    }
}
 

})(gameDataController, UIController);

controller.init(); // Calling this function to start the game.

//Restart the game
const f = document.querySelector('.restart')

f.onclick = function(b) {
    document.location.reload()
}



