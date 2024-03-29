document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const resetBtn = document.getElementById('resetBtn');
    let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [];
    let matchesFound = 0;

    const shuffleCards = () => {
        cards.sort(() => 0.5 - Math.random());
    };

    const createBoard = () => {
        shuffleCards();
        gameBoard.innerHTML = ''; // Clear the board
        for (let i = 0; i < cards.length; i++) {
            let card = document.createElement('div');
            card.classList.add('card', 'hidden');
            card.setAttribute('data-name', cards[i]);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    };

    const flipCard = (e) => {
        let selectedCard = e.target;
        if (flippedCards.length < 2 && selectedCard.classList.contains('hidden')) {
            selectedCard.classList.remove('hidden');
            selectedCard.textContent = selectedCard.getAttribute('data-name');
            flippedCards.push(selectedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    };

    const checkForMatch = () => {
        let [card1, card2] = flippedCards;
        if (card1.getAttribute('data-name') === card2.getAttribute('data-name')) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchesFound += 1;
        } else {
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            setTimeout(() => {
                card1.textContent = '';
                card2.textContent = '';
            }, 500);
        }
        flippedCards = [];

        if (matchesFound === cards.length / 2) {
            alert('You found all matches!');
        }
    };

    const resetGame = () => {
        flippedCards = [];
        matchesFound = 0;
        createBoard();
    };

    resetBtn.addEventListener('click', resetGame);

    createBoard();
});
