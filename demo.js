// Demo mode - works without Firebase
let gameState = {
    playerName: null,
    currentCardIndex: 0,
    selectedCities: []
};

// DOM elements
const screens = {
    start: document.getElementById('startScreen'),
    game: document.getElementById('gameScreen'),
    results: document.getElementById('resultsScreen')
};

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Start Demo
document.getElementById('startDemoBtn').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    gameState.playerName = playerName;
    gameState.currentCardIndex = 0;
    gameState.selectedCities = [];
    
    document.getElementById('currentPlayer').textContent = playerName;
    showScreen('game');
    displayCard();
});

function displayCard() {
    if (gameState.currentCardIndex >= cities.length) {
        showResults();
        return;
    }

    const card = document.getElementById('currentCard');
    const city = cities[gameState.currentCardIndex];

    card.querySelector('.card-emoji').textContent = city.emoji;
    card.querySelector('.card-city').textContent = city.city;
    card.querySelector('.card-country').textContent = city.country;
    card.querySelector('.card-description').textContent = city.description;

    // Update score
    document.getElementById('scoreDisplay').textContent = 
        `Cards: ${gameState.currentCardIndex + 1}/${cities.length}`;

    // Reset card position
    card.style.transform = '';
    card.classList.remove('swiped-left', 'swiped-right');
}

// Card swipe functionality
let startX = 0;
let currentX = 0;
let isDragging = false;

const card = document.getElementById('currentCard');

card.addEventListener('mousedown', startDrag);
card.addEventListener('touchstart', startDrag);
card.addEventListener('mousemove', drag);
card.addEventListener('touchmove', drag);
card.addEventListener('mouseup', endDrag);
card.addEventListener('touchend', endDrag);
card.addEventListener('mouseleave', endDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    card.classList.add('dragging');
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();

    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX - startX;
    const rotation = deltaX / 10;

    card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

    // Show indicators
    const leftIndicator = document.querySelector('.indicator.left');
    const rightIndicator = document.querySelector('.indicator.right');

    if (deltaX < -50) {
        leftIndicator.classList.add('visible');
        rightIndicator.classList.remove('visible');
    } else if (deltaX > 50) {
        rightIndicator.classList.add('visible');
        leftIndicator.classList.remove('visible');
    } else {
        leftIndicator.classList.remove('visible');
        rightIndicator.classList.remove('visible');
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove('dragging');

    const deltaX = currentX - startX;

    // Swipe threshold
    if (Math.abs(deltaX) > 100) {
        if (deltaX > 0) {
            makeChoice(true);
        } else {
            makeChoice(false);
        }
    } else {
        // Return to center
        card.style.transform = '';
        document.querySelector('.indicator.left').classList.remove('visible');
        document.querySelector('.indicator.right').classList.remove('visible');
    }
}

// Button controls
document.getElementById('rejectBtn').addEventListener('click', () => makeChoice(false));
document.getElementById('acceptBtn').addEventListener('click', () => makeChoice(true));

function makeChoice(accepted) {
    const city = cities[gameState.currentCardIndex];

    // Animate card
    const card = document.getElementById('currentCard');
    if (accepted) {
        card.classList.add('swiped-right');
        gameState.selectedCities.push(gameState.currentCardIndex);
    } else {
        card.classList.add('swiped-left');
    }

    // Move to next card
    setTimeout(() => {
        gameState.currentCardIndex++;
        displayCard();
    }, 500);
}

function showResults() {
    showScreen('results');

    const selectedCitiesDiv = document.getElementById('selectedCities');
    
    selectedCitiesDiv.innerHTML = gameState.selectedCities
        .map(index => {
            const city = cities[index];
            return `
                <div class="city-result">
                    <div class="emoji">${city.emoji}</div>
                    <div>
                        <div class="city-name">${city.city}</div>
                        <div class="country-name">${city.country}</div>
                    </div>
                </div>
            `;
        })
        .join('');

    document.getElementById('totalChosen').textContent = gameState.selectedCities.length;
}

// Play again
document.getElementById('playAgainBtn').addEventListener('click', () => {
    showScreen('start');
    document.getElementById('playerName').value = '';
});
