const gameDataController = (function() {

    let currentCard = [];
    let currentCardClass = [];
    let sec = 0;
    let min = 0;
    let moves = 0;
    
    function avoid() {
        currentCardClass.pop();
        currentCardClass.shift();
        currentCard.pop();
        currentCard.shift();
    }

    function matchCard() {
        document.getElementById(currentCard[0]).classList.remove('open');
        document.getElementById(currentCard[1]).classList.remove('open');
        document.getElementById(currentCard[0]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.add('match');
        document.getElementById(currentCard[0]).classList.add('match');
        currentCardClass.pop();
        currentCardClass.shift();
        currentCard.pop();
        currentCard.shift();
    }

    function notMatchCard() {
        document.getElementById(currentCard[0]).style.pointerEvents="auto";
        document.getElementById(currentCard[1]).style.pointerEvents="auto";
        document.querySelector(".deck").style.pointerEvents="auto"
        document.getElementById(currentCard[0]).classList.remove('unmatch');
        document.getElementById(currentCard[1]).classList.remove('unmatch');
        document.getElementById(currentCard[0]).classList.remove('open');
        document.getElementById(currentCard[1]).classList.remove('open');
        document.getElementById(currentCard[0]).classList.remove('show');
        document.getElementById(currentCard[1]).classList.remove('show')
        currentCardClass.pop();
        currentCardClass.shift();
        currentCard.pop();
        currentCard.shift();
    }

    return {
        storeCardValue: function(evt) {
            currentCardClass.push(evt.target.firstChild.classList[1]);
            //To avoid double clicking the card
            evt.target.style.pointerEvents="none";
            currentCard.push(evt.target.id);
            console.log(currentCard);
            console.log(currentCardClass);
        },
        checkCurrent: function() {
            
                if(currentCardClass[0]===currentCardClass[1] && currentCard[0] !== currentCard[1]){
                    matchCard();
                }
                 else if(currentCard.length > 1 && document.getElementById(currentCard[0]).classList.contains('open') && document.getElementById(currentCard[1]).classList.contains('open') && currentCardClass[0]!==currentCardClass[1]) {
                    this.ifTwoCards();
                    setTimeout(notMatchCard, 500);
                }
        },
        moveCounter: function() {
            if(currentCard.length > 1) {
                ++moves;
            }
            document.querySelector(".moves").textContent = moves;
        },
        moveStars: function() {
            if(currentCard.length > 1 && (moves == 8 || moves == 16) ){
                document.querySelector(".stars").getElementsByTagName('li')[0].remove();
            }
        },
        winGame: function() {
            let matchedCards = document.querySelectorAll(".match").length;
            console.log(matchedCards)
            if(matchedCards === 16) {
                this.loopAndNone();
                this.modalStyle();
                document.getElementById('timer').display = "none";
            }
        },
        startTimer: function() {
                sec++;
                if (sec > 59) {
                    sec = 0;
                    min++;
                }
                document.getElementById('timer').textContent = min + ":" + sec;
        },
        ifTwoCards: function() {
            document.querySelector(".deck").style.pointerEvents="none";
            document.getElementById(currentCard[0]).classList.add('unmatch');
            document.getElementById(currentCard[1]).classList.add('unmatch');
        },
        modalStyle: function() {
            document.querySelector(".deck").style.justifyContent = "center";
            document.querySelector(".modal").style.display = "block";
            document.querySelector(".timer").textContent = min + " Minutes And " + sec + " Seconds";

        },
        loopAndNone: function() {
            var cardsToHide = document.getElementsByClassName("card"); //divsToHide is an array
            for(var i = 0; i < cardsToHide.length; i++){// or
                cardsToHide[i].style.display = "none"; // depending on what you're doing
            }
        }

    }

})();

const UIController = (function() {
    
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

let arr = [diamond, plane, anchor, bolt, cube, leaf, cycle, bomb, diamond2, plane2, anchor2, bolt2, cube2, leaf2, cycle2, bomb2];

return {
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
    addCardToUI: function() {
        document.createElement('li')

        const ul = document.querySelector(".deck")

        for(i=0; i < arr.length; i++) {
            ul.insertAdjacentHTML('beforeend', arr[i]);
        };
    },
    openCard: function(evt) {
        evt.target.classList.add('open');
        evt.target.classList.add('show');
    },
    getArray: function() {
        return arr;
    }
}

})();

const controller = (function(game, UI) {

    let cards = UI.getArray()

const setCards = function (){

        // shuffle the list of cards using the provided "shuffle" method below
        UI.shuffle(cards);
        // Display the cards on the page and loop through each card and create its HTML and add each card's HTML to the page
        UI.addCardToUI();
}

const setEventListeners = function() {
    let clicks = 0; // counter 
 // element
    document.querySelector(".deck").addEventListener('click', function(b) { // onclick not onClick
      ++clicks; // increment it
      console.log(clicks);
    })

    document.querySelector(".deck").addEventListener('click', addStuff)

    document.querySelector(".deck").addEventListener('click', function() {
        console.log(clicks);
    });
}

const addStuff = function(evt) {
//  set up the event listener for a card. If a card is clicked:
//    - display the card's symbol (put this functionality in another function that you call from this one)
    UI.openCard(evt);
//    - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    game.storeCardValue(evt);
//    - if the list already has another card, check to see if the two cards match
//      + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
//      + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    game.checkCurrent();
//      + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    game.moveCounter();
    game.moveStars();
//      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    game.winGame();
}

return {
    init: function() {
        console.log("Game Has started")
        setCards();
        setEventListeners();
        //Timer starts
        setInterval(game.startTimer, 1000);
    }
}
 

})(gameDataController, UIController);

controller.init();

//restart game
const f = document.querySelector('.restart')

f.onclick = function(b) {
    document.location.reload()
}



