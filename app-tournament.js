// Tournament-based game state
let gameState = {
    gameCode: null,
    playerName: null,
    playerId: null,
    isHost: false,
    bracket: [],
    currentRound: 0,
    currentMatch: 0,
    phase: 'waiting', // waiting, writing, debate, voting, results
    timerInterval: null,
    timeRemaining: 0,
    myVote: null,
    winners: []
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
    citySelection: document.getElementById('citySelectionScreen'),
    bracket: document.getElementById('bracketScreen'),
    writing: document.getElementById('writingScreen'),
    debate: document.getElementById('debateScreen'),
    results: document.getElementById('resultsScreen')
};

let selectedCities = [];
let customCities = [];

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

function showMessage(message, type = 'info') {
    alert(message); // Simplified for now
}

// Generate tournament bracket (8 cities for quarterfinals)
function generateBracket() {
    // Shuffle cities but keep Milan and Rome at the top if preferred
    let shuffled = [...cities];
    
    // Separate preferred and regular cities
    const preferred = shuffled.filter(c => c.preferred);
    const regular = shuffled.filter(c => !c.preferred);
    
    // Shuffle each group
    preferred.sort(() => Math.random() - 0.5);
    regular.sort(() => Math.random() - 0.5);
    
    // Take 8 cities (prefer Milan and Rome)
    const bracketCities = [...preferred.slice(0, 2), ...regular].slice(0, 8);
    
    // Create initial bracket (quarterfinals: 4 matches)
    const bracket = [];
    for (let i = 0; i < bracketCities.length; i += 2) {
        bracket.push({
            city1: bracketCities[i],
            city2: bracketCities[i + 1],
            winner: null,
            round: 'quarterfinals'
        });
    }
    
    return bracket;
}

// Start Screen - Create Game
document.getElementById('createGameBtn').addEventListener('click', async () => {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    if (!database) {
        alert('Firebase not configured. Please check config.js');
        return;
    }

    gameState.playerName = playerName;
    gameState.playerId = 'player_' + Date.now();
    gameState.gameCode = generateGameCode();
    gameState.isHost = true;

    try {
        const bracket = generateBracket();
        
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
            bracket: bracket,
            currentRound: 0,
            currentMatch: 0,
            phase: 'waiting',
            createdAt: Date.now()
        });

        setupGameListeners();
        document.getElementById('displayGameCode').textContent = gameState.gameCode;
        updatePlayersList();
        document.getElementById('startGameBtn').style.display = 'block';
        showScreen('waiting');
    } catch (error) {
        console.error('Error creating game:', error);
        alert('Error creating game. Please try again.');
    }
});

// Start Screen - Join Game
document.getElementById('joinGameBtn').addEventListener('click', async () => {
    const playerName = document.getElementById('playerName').value.trim();
    const gameCode = document.getElementById('gameCode').value.trim().toUpperCase();

    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    if (!gameCode) {
        alert('Please enter a game code');
        return;
    }

    if (!database) {
        alert('Firebase not configured. Please check config.js');
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
            alert('Game not found. Please check the code.');
            return;
        }

        const gameData = snapshot.val();
        if (gameData.status !== 'waiting') {
            alert('This game has already started.');
            return;
        }

        await gameRef.child('players/' + gameState.playerId).set({
            name: playerName,
            ready: true
        });

        setupGameListeners();
        document.getElementById('displayGameCode').textContent = gameCode;
        updatePlayersList();
        document.getElementById('startGameBtn').style.display = 'none';
        showScreen('waiting');
    } catch (error) {
        console.error('Error joining game:', error);
        alert('Error joining game. Please try again.');
    }
});

// Setup game listeners
function setupGameListeners() {
    gameRef.on('value', (snapshot) => {
        if (!snapshot.exists()) return;

        const gameData = snapshot.val();

        if (gameData.players) {
            updatePlayersList(gameData.players);
        }

        // Handle phase changes
        if (gameData.status === 'playing') {
            gameState.phase = gameData.phase;
            gameState.currentRound = gameData.currentRound;
            gameState.currentMatch = gameData.currentMatch;
            gameState.bracket = gameData.bracket;

            switch(gameData.phase) {
                case 'bracket':
                    showBracket(gameData);
                    break;
                case 'writing':
                    startWritingPhase(gameData);
                    break;
                case 'debate':
                    startDebatePhase(gameData);
                    break;
            }
        }

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

// Start tournament button
document.getElementById('startGameBtn').addEventListener('click', async () => {
    if (!gameState.isHost) return;

    try {
        await gameRef.update({
            status: 'playing',
            phase: 'bracket',
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

// Show bracket
function showBracket(gameData) {
    showScreen('bracket');
    
    const bracket = gameData.bracket || [];
    const bracketDisplay = document.getElementById('bracketDisplay');
    
    let html = '<div class="bracket-rounds">';
    
    // Group by round
    const rounds = {};
    bracket.forEach(match => {
        if (!rounds[match.round]) rounds[match.round] = [];
        rounds[match.round].push(match);
    });
    
    Object.keys(rounds).forEach(roundName => {
        html += `<div class="bracket-round">
            <h3>${roundName.charAt(0).toUpperCase() + roundName.slice(1)}</h3>`;
        
        rounds[roundName].forEach((match, idx) => {
            html += `<div class="bracket-match ${match.winner ? 'completed' : ''}">
                <div class="bracket-city">${match.city1.emoji} ${match.city1.city}</div>
                <div class="vs-small">vs</div>
                <div class="bracket-city">${match.city2.emoji} ${match.city2.city}</div>
                ${match.winner ? `<div class="winner-badge">Winner: ${match.winner.city}</div>` : ''}
            </div>`;
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    bracketDisplay.innerHTML = html;
}

// Start next match
document.getElementById('startMatchBtn').addEventListener('click', async () => {
    if (!gameState.isHost) return;
    
    await gameRef.update({
        phase: 'writing',
        timeRemaining: 60 // 1 minute
    });
});

// Writing phase
function startWritingPhase(gameData) {
    showScreen('writing');
    
    const bracket = gameData.bracket || [];
    const currentMatch = bracket[gameData.currentMatch];
    
    if (!currentMatch) return;
    
    // Display cities
    document.getElementById('city1Emoji').textContent = currentMatch.city1.emoji;
    document.getElementById('city1Name').textContent = currentMatch.city1.city;
    document.getElementById('city1Country').textContent = currentMatch.city1.country;
    
    document.getElementById('city2Emoji').textContent = currentMatch.city2.emoji;
    document.getElementById('city2Name').textContent = currentMatch.city2.city;
    document.getElementById('city2Country').textContent = currentMatch.city2.country;
    
    // Start timer
    startTimer(gameData.timeRemaining || 60, 'writingTimer', async () => {
        // Time's up - save and move to debate
        await saveWritingData();
        if (gameState.isHost) {
            await gameRef.update({
                phase: 'debate',
                timeRemaining: 300 // 5 minutes
            });
        }
    });
}

function startTimer(seconds, elementId, onComplete) {
    clearInterval(gameState.timerInterval);
    gameState.timeRemaining = seconds;
    
    const timerElement = document.getElementById(elementId);
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        
        const mins = Math.floor(gameState.timeRemaining / 60);
        const secs = gameState.timeRemaining % 60;
        timerElement.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            if (onComplete) onComplete();
        }
    }, 1000);
}

async function saveWritingData() {
    const matchKey = `match_${gameState.currentRound}_${gameState.currentMatch}`;
    
    await gameRef.child(`writing/${matchKey}/${gameState.playerId}`).set({
        city1: {
            pros: document.getElementById('city1Pros').value,
            cons: document.getElementById('city1Cons').value
        },
        city2: {
            pros: document.getElementById('city2Pros').value,
            cons: document.getElementById('city2Cons').value
        },
        timestamp: Date.now()
    });
}

// Debate phase
function startDebatePhase(gameData) {
    showScreen('debate');
    
    const bracket = gameData.bracket || [];
    const currentMatch = bracket[gameData.currentMatch];
    const matchKey = `match_${gameData.currentRound}_${gameData.currentMatch}`;
    const writingData = gameData.writing?.[matchKey] || {};
    
    if (!currentMatch) return;
    
    // Display cities
    document.getElementById('debate1Emoji').textContent = currentMatch.city1.emoji;
    document.getElementById('debate1Name').textContent = currentMatch.city1.city;
    document.getElementById('debate1Country').textContent = currentMatch.city1.country;
    
    document.getElementById('debate2Emoji').textContent = currentMatch.city2.emoji;
    document.getElementById('debate2Name').textContent = currentMatch.city2.city;
    document.getElementById('debate2Country').textContent = currentMatch.city2.country;
    
    // Display writing from both players
    const players = Object.keys(gameData.players || {});
    players.forEach((playerId, idx) => {
        const playerData = writingData[playerId];
        const playerName = gameData.players[playerId].name;
        
        if (playerData) {
            document.getElementById(`player${idx + 1}Name1`).textContent = playerName;
            document.getElementById(`player${idx + 1}City1Pros`).textContent = playerData.city1.pros || 'No input';
            document.getElementById(`player${idx + 1}City1Cons`).textContent = playerData.city1.cons || 'No input';
            
            document.getElementById(`player${idx + 1}Name2`).textContent = playerName;
            document.getElementById(`player${idx + 1}City2Pros`).textContent = playerData.city2.pros || 'No input';
            document.getElementById(`player${idx + 1}City2Cons`).textContent = playerData.city2.cons || 'No input';
        }
    });
    
    // Setup vote buttons
    document.getElementById('voteCity1').onclick = () => vote(currentMatch.city1);
    document.getElementById('voteCity2').onclick = () => vote(currentMatch.city2);
    
    // Start timer
    const debateTime = gameData.debateExtended ? 60 : 300;
    const timerText = gameData.debateExtended ? '1 minute extended debate' : '5 minutes to discuss';
    document.getElementById('debatePhaseInfo').textContent = timerText;
    
    startTimer(gameData.timeRemaining || debateTime, 'debateTimer', async () => {
        // Time's up - enable voting if not already done
        document.getElementById('voteCity1').disabled = false;
        document.getElementById('voteCity2').disabled = false;
    });
}

async function vote(city) {
    gameState.myVote = city.city;
    
    const matchKey = `match_${gameState.currentRound}_${gameState.currentMatch}`;
    await gameRef.child(`votes/${matchKey}/${gameState.playerId}`).set({
        city: city.city,
        timestamp: Date.now()
    });
    
    document.getElementById('votingStatus').textContent = `You voted for ${city.city}. Waiting for partner...`;
    
    // Check if both voted
    checkVotingComplete();
}

async function checkVotingComplete() {
    const matchKey = `match_${gameState.currentRound}_${gameState.currentMatch}`;
    const votesSnapshot = await gameRef.child(`votes/${matchKey}`).once('value');
    const votes = votesSnapshot.val() || {};
    
    const voteList = Object.values(votes);
    
    if (voteList.length === 2) {
        // Both players voted
        if (voteList[0].city === voteList[1].city) {
            // Agreement - city wins
            if (gameState.isHost) {
                await recordWinner(voteList[0].city);
            }
        } else {
            // Disagreement - extend debate
            if (gameState.isHost) {
                await gameRef.update({
                    debateExtended: true,
                    timeRemaining: 60
                });
                // Clear votes for revote
                await gameRef.child(`votes/${matchKey}`).remove();
            }
        }
    }
}

async function recordWinner(winnerCityName) {
    const bracket = gameState.bracket;
    const currentMatch = bracket[gameState.currentMatch];
    
    // Find winner city object
    const winner = currentMatch.city1.city === winnerCityName ? currentMatch.city1 : currentMatch.city2;
    
    // Update bracket
    bracket[gameState.currentMatch].winner = winner;
    gameState.winners.push(winner);
    
    // Check if round is complete
    const roundMatches = bracket.filter(m => m.round === currentMatch.round);
    const completedMatches = roundMatches.filter(m => m.winner);
    
    if (completedMatches.length === roundMatches.length) {
        // Round complete - create next round or finish
        if (currentMatch.round === 'quarterfinals') {
            // Create semifinals
            const winners = completedMatches.map(m => m.winner);
            for (let i = 0; i < winners.length; i += 2) {
                bracket.push({
                    city1: winners[i],
                    city2: winners[i + 1],
                    winner: null,
                    round: 'semifinals'
                });
            }
        } else if (currentMatch.round === 'semifinals') {
            // Create final
            const winners = completedMatches.map(m => m.winner);
            bracket.push({
                city1: winners[0],
                city2: winners[1],
                winner: null,
                round: 'final'
            });
        } else if (currentMatch.round === 'final') {
            // Tournament complete
            await gameRef.update({
                status: 'finished',
                bracket: bracket,
                winners: gameState.winners.slice(0, 3) // Top 3
            });
            return;
        }
    }
    
    // Move to next match
    await gameRef.update({
        bracket: bracket,
        currentMatch: gameState.currentMatch + 1,
        phase: 'bracket'
    });
}

// Show results
function showResults(gameData) {
    showScreen('results');
    
    const winners = gameData.winners || [];
    const selectedCitiesDiv = document.getElementById('selectedCities');
    
    let html = '';
    
    // London (start)
    html += `
        <div class="city-result fixed-city">
            <div class="emoji">${fixedStartCity.emoji}</div>
            <div>
                <div class="city-name">${fixedStartCity.city}</div>
                <div class="country-name">${fixedStartCity.country}</div>
                <div class="city-date">${fixedStartCity.date}</div>
            </div>
        </div>
    `;
    
    // Top 3 winners
    winners.forEach((city, idx) => {
        html += `
            <div class="city-result winner-city">
                <div class="trophy">${['🥇', '🥈', '🥉'][idx]}</div>
                <div class="emoji">${city.emoji}</div>
                <div>
                    <div class="city-name">${city.city}</div>
                    <div class="country-name">${city.country}</div>
                </div>
            </div>
        `;
    });
    
    // Madrid (end)
    html += `
        <div class="city-result fixed-city">
            <div class="emoji">${fixedEndCity.emoji}</div>
            <div>
                <div class="city-name">${fixedEndCity.city}</div>
                <div class="country-name">${fixedEndCity.country}</div>
                <div class="city-date">${fixedEndCity.date}</div>
            </div>
        </div>
    `;
    
    selectedCitiesDiv.innerHTML = html;
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
    document.getElementById('playerName').value = '';
    document.getElementById('gameCode').value = '';
});

// Clean up
window.addEventListener('beforeunload', () => {
    if (gameRef) {
        gameRef.off();
        if (gameState.playerId) {
            gameRef.child('players/' + gameState.playerId).remove();
        }
    }
});
