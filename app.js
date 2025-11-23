// Game state
let gameState = {
    gameCode: null,
    playerName: null,
    playerId: null,
    currentCardIndex: 0,
    playerChoices: {},
    isHost: false
};

let database = null;
let gameRef = null;

// Initialize database
try {
    database = firebase.database();
} catch (error) {
    console.error('Database initialization error:', error);
}

// DOM elements
const screens = {
    start: document.getElementById('startScreen'),
    waiting: document.getElementById('waitingScreen'),
    game: document.getElementById('gameScreen'),
    results: document.getElementById('resultsScreen')
};

// Utility functions
function generateGameCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function showMessage(message, type = 'waiting') {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = `status-message visible ${type}`;
    setTimeout(() => {
        statusMessage.classList.remove('visible');
    }, 3000);
}

// Start Screen - Create Game
document.getElementById('createGameBtn').addEventListener('click', async () => {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Por favor, ingresá tu nombre');
        return;
    }

    if (!database) {
        alert('Firebase no configurado. Por favor, verificá config.js');
        return;
    }

    gameState.playerName = playerName;
    gameState.playerId = 'player_' + Date.now();
    gameState.gameCode = generateGameCode();
    gameState.isHost = true;

    try {
        // Create game in database
        gameRef = database.ref('games/' + gameState.gameCode);
        await gameRef.set({
            host: gameState.playerId,
            players: {
                [gameState.playerId]: {
                    name: playerName,
                    ready: true
                }
            },
            status: 'waiting',
            currentCard: -1,
            choices: {},
            createdAt: Date.now()
        });

        // Listen for changes
        setupGameListeners();

        // Show waiting screen
        document.getElementById('displayGameCode').textContent = gameState.gameCode;
        updatePlayersList();
        document.getElementById('startGameBtn').style.display = 'block';
        showScreen('waiting');
    } catch (error) {
        console.error('Error creating game:', error);
        alert('Error al crear la partida. Por favor, intentá de nuevo.');
    }
});

// Start Screen - Join Game
document.getElementById('joinGameBtn').addEventListener('click', async () => {
    const playerName = document.getElementById('playerName').value.trim();
    const gameCode = document.getElementById('gameCode').value.trim().toUpperCase();

    if (!playerName) {
        alert('Por favor, ingresá tu nombre');
        return;
    }

    if (!gameCode) {
        alert('Por favor, ingresá un código de partida');
        return;
    }

    if (!database) {
        alert('Firebase no configurado. Por favor, verificá config.js');
        return;
    }

    gameState.playerName = playerName;
    gameState.playerId = 'player_' + Date.now();
    gameState.gameCode = gameCode;
    gameState.isHost = false;

    try {
        gameRef = database.ref('games/' + gameCode);
        const snapshot = await gameRef.once('value');

        if (!snapshot.exists()) {
            alert('Partida no encontrada. Por favor, verificá el código.');
            return;
        }

        const gameData = snapshot.val();
        if (gameData.status !== 'waiting') {
            alert('Esta partida ya comenzó.');
            return;
        }

        // Add player to game
        await gameRef.child('players/' + gameState.playerId).set({
            name: playerName,
            ready: true
        });

        // Listen for changes
        setupGameListeners();

        // Show waiting screen
        document.getElementById('displayGameCode').textContent = gameCode;
        updatePlayersList();
        document.getElementById('startGameBtn').style.display = 'none';
        showScreen('waiting');
    } catch (error) {
        console.error('Error joining game:', error);
        alert('Error al unirse a la partida. Por favor, intentá de nuevo.');
    }
});

// Setup game listeners
function setupGameListeners() {
    gameRef.on('value', (snapshot) => {
        if (!snapshot.exists()) return;

        const gameData = snapshot.val();

        // Update players list
        if (gameData.players) {
            updatePlayersList(gameData.players);
        }

        // Check game status
        if (gameData.status === 'playing' && screens.game.classList.contains('active') === false && screens.waiting.classList.contains('active')) {
            startGame();
        }

        // Update current card
        if (gameData.status === 'playing') {
            gameState.currentCardIndex = gameData.currentCard || 0;
            displayCard();
            checkBothPlayersChose(gameData);
        }

        // Check if game ended
        if (gameData.status === 'finished') {
            showResults(gameData);
        }
    });
}

function updatePlayersList(players) {
    if (!players) return;

    const playersList = document.getElementById('playersList');
    const playerNames = Object.values(players).map(p => p.name);

    playersList.innerHTML = playerNames
        .map(name => `<div class="player-item">${name}</div>`)
        .join('');
}

// Start game button
document.getElementById('startGameBtn').addEventListener('click', async () => {
    if (!gameState.isHost) return;

    try {
        await gameRef.update({
            status: 'playing',
            currentCard: -1,
            startedAt: Date.now()
        });
    } catch (error) {
        console.error('Error starting game:', error);
    }
});

// Leave waiting room
document.getElementById('leaveWaitingBtn').addEventListener('click', () => {
    if (gameRef) {
        if (gameState.isHost) {
            gameRef.remove();
        } else {
            gameRef.child('players/' + gameState.playerId).remove();
        }
        gameRef.off();
    }
    showScreen('start');
});

// Game Screen
function startGame() {
    showScreen('game');
    gameState.currentCardIndex = -1; // Start with -1 to show London first
    gameState.playerChoices = {};
    document.getElementById('currentPlayer').textContent = gameState.playerName;
    displayCard();
}

function displayCard() {
    let city;
    let cardIndex = gameState.currentCardIndex;
    
    // Show fixed start city (London)
    if (cardIndex === -1) {
        city = fixedStartCity;
    }
    // Show fixed end city (Madrid)
    else if (cardIndex === cities.length) {
        city = fixedEndCity;
    }
    // Show cities to choose from
    else if (cardIndex >= 0 && cardIndex < cities.length) {
        city = cities[cardIndex];
    }
    else {
        endGame();
        return;
    }

    const card = document.getElementById('currentCard');
    
    card.querySelector('.card-emoji').textContent = city.emoji;
    card.querySelector('.card-city').textContent = city.city;
    card.querySelector('.card-country').textContent = city.country;
    card.querySelector('.card-description').textContent = city.description;

    // Update score display
    if (city.isFixed) {
        // For fixed cities, show the date
        document.getElementById('scoreDisplay').textContent = city.date;
    } else {
        // For selectable cities, show progress
        document.getElementById('scoreDisplay').textContent = 
            `Cartas: ${cardIndex + 1}/${cities.length}`;
    }

    // Update controls visibility
    const controls = document.querySelector('.controls');
    const indicators = document.querySelector('.choice-indicators');
    
    if (city.isFixed) {
        // Hide controls for fixed cities
        controls.style.display = 'none';
        indicators.style.display = 'none';
    } else {
        // Show controls for selectable cities
        controls.style.display = 'flex';
        indicators.style.display = 'flex';
    }

    // Reset card position
    card.style.transform = '';
    card.classList.remove('swiped-left', 'swiped-right');
    
    // Auto-advance for fixed cities after 2 seconds
    if (city.isFixed) {
        setTimeout(() => {
            advanceToNextCard();
        }, 2000);
    }
}

function advanceToNextCard() {
    if (gameState.isHost) {
        const nextIndex = gameState.currentCardIndex + 1;
        // If we just showed Madrid (end city), finish the game
        if (nextIndex > cities.length) {
            gameRef.update({ status: 'finished' });
        } else {
            gameRef.update({ currentCard: nextIndex });
        }
    }
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

async function makeChoice(accepted) {
    // Don't allow choice for fixed cities
    if (gameState.currentCardIndex < 0 || gameState.currentCardIndex >= cities.length) {
        return;
    }
    
    const city = cities[gameState.currentCardIndex];

    // Animate card
    const card = document.getElementById('currentCard');
    if (accepted) {
        card.classList.add('swiped-right');
    } else {
        card.classList.add('swiped-left');
    }

    // Save choice to database
    try {
        const choiceKey = `${gameState.playerId}_${gameState.currentCardIndex}`;
        await gameRef.child('choices/' + choiceKey).set({
            playerId: gameState.playerId,
            cardIndex: gameState.currentCardIndex,
            city: city.city,
            accepted: accepted,
            timestamp: Date.now()
        });

        gameState.playerChoices[gameState.currentCardIndex] = accepted;

        // Show waiting message
        showMessage('Esperando a tu compañero...', 'waiting');
    } catch (error) {
        console.error('Error saving choice:', error);
    }
}

async function checkBothPlayersChose(gameData) {
    const choices = gameData.choices || {};
    const players = gameData.players || {};
    const playerIds = Object.keys(players);

    if (playerIds.length < 2) return;

    const currentIndex = gameState.currentCardIndex;
    
    // Skip check for fixed cities
    if (currentIndex < 0 || currentIndex >= cities.length) return;
    
    const choices1 = Object.values(choices).filter(c => 
        c.playerId === playerIds[0] && c.cardIndex === currentIndex
    );
    const choices2 = Object.values(choices).filter(c => 
        c.playerId === playerIds[1] && c.cardIndex === currentIndex
    );

    if (choices1.length > 0 && choices2.length > 0) {
        // Both players have chosen
        const bothAccepted = choices1[0].accepted && choices2[0].accepted;

        if (bothAccepted) {
            showMessage('🎉 ¡Ambos eligieron esta ciudad!', 'match');
        } else {
            showMessage('Diferentes elecciones', 'no-match');
        }

        // Move to next card after delay
        setTimeout(async () => {
            if (gameState.isHost) {
                const nextIndex = currentIndex + 1;
                // After last selectable city, show Madrid (end city)
                if (nextIndex >= cities.length) {
                    await gameRef.update({ currentCard: cities.length });
                } else {
                    await gameRef.update({ currentCard: nextIndex });
                }
            }
        }, 1500);
    }
}

function endGame() {
    // Host will update status
    if (gameState.isHost) {
        gameRef.update({ status: 'finished' });
    }
}

function showResults(gameData) {
    showScreen('results');

    const choices = gameData.choices || {};
    const selectedCitiesDiv = document.getElementById('selectedCities');
    const players = Object.keys(gameData.players || {});

    // Group choices by card index
    const choicesByCard = {};
    Object.values(choices).forEach(choice => {
        if (!choicesByCard[choice.cardIndex]) {
            choicesByCard[choice.cardIndex] = [];
        }
        choicesByCard[choice.cardIndex].push(choice);
    });

    // Find mutually chosen cities
    const mutualCities = [];
    const allChosen = [];

    Object.entries(choicesByCard).forEach(([index, cardChoices]) => {
        if (cardChoices.length === 2) {
            const bothAccepted = cardChoices.every(c => c.accepted);
            const anyAccepted = cardChoices.some(c => c.accepted);

            if (bothAccepted) {
                mutualCities.push(parseInt(index));
            }
            if (anyAccepted) {
                allChosen.push(parseInt(index));
            }
        }
    });

    // Build itinerary: London (start) + chosen cities + Madrid (end)
    let itineraryHTML = '';
    
    // Add London (fixed start)
    itineraryHTML += `
        <div class="city-result fixed-city">
            <div class="emoji">${fixedStartCity.emoji}</div>
            <div>
                <div class="city-name">${fixedStartCity.city}</div>
                <div class="country-name">${fixedStartCity.country}</div>
                <div class="city-date">${fixedStartCity.date}</div>
            </div>
        </div>
    `;
    
    // Add chosen cities
    itineraryHTML += allChosen
        .sort((a, b) => a - b)
        .map(index => {
            const city = cities[index];
            const isMutual = mutualCities.includes(index);
            return `
                <div class="city-result ${isMutual ? 'mutual' : ''}">
                    <div class="emoji">${city.emoji}</div>
                    <div>
                        <div class="city-name">${city.city}</div>
                        <div class="country-name">${city.country}</div>
                    </div>
                </div>
            `;
        })
        .join('');
    
    // Add Madrid (fixed end)
    itineraryHTML += `
        <div class="city-result fixed-city">
            <div class="emoji">${fixedEndCity.emoji}</div>
            <div>
                <div class="city-name">${fixedEndCity.city}</div>
                <div class="country-name">${fixedEndCity.country}</div>
                <div class="city-date">${fixedEndCity.date}</div>
            </div>
        </div>
    `;

    selectedCitiesDiv.innerHTML = itineraryHTML;

    document.getElementById('totalChosen').textContent = allChosen.length + 2; // +2 for London and Madrid
    document.getElementById('mutualChoices').textContent = mutualCities.length;
}

// Play again
document.getElementById('playAgainBtn').addEventListener('click', () => {
    if (gameRef) {
        gameRef.off();
        if (gameState.isHost) {
            gameRef.remove();
        }
    }
    showScreen('start');
    // Clear inputs
    document.getElementById('playerName').value = '';
    document.getElementById('gameCode').value = '';
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (gameRef) {
        gameRef.off();
        if (gameState.playerId) {
            gameRef.child('players/' + gameState.playerId).remove();
        }
    }
});
