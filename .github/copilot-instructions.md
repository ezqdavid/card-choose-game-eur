# Copilot Agent Instructions for card-choose-game-eur

## Repository Summary

A real-time multiplayer card game for couples to plan European travel itineraries together. The main game is a tournament-style city selection system using Firebase Realtime Database for synchronization. There is also an offline demo mode for single-player testing.

**Project Type:** Static web application (no build system)  
**Languages:** HTML5, CSS3, Vanilla JavaScript  
**Backend:** Firebase Realtime Database  
**Approximate Size:** ~3,800 lines across 9 source files  
**Primary Language:** Spanish (Argentine Spanish - es-ar)

---

## Project Layout

```
card-choose-game-eur/
├── index.html              # Main tournament game UI
├── demo.html               # Offline single-player demo UI
├── styles.css              # All styling (~1,400 lines, haute couture design)
├── app-tournament.js       # Tournament game logic (~920 lines) - PRIMARY GAME FILE
├── app.js                  # Legacy swipe-style game logic (~580 lines)
├── demo.js                 # Demo mode game logic (~220 lines)
├── cities.js               # European city data with images (~180 lines)
├── config.js               # Firebase configuration
├── i18n.js                 # Internationalization module (Spanish-Argentine)
├── README.md               # Project documentation
├── PROJECT-SUMMARY.md      # Detailed design and feature documentation
├── QUICKSTART.md           # User quick start guide
├── QUICKSTART-TESTING.md   # Testing setup guide
├── DEPLOYMENT.md           # Production deployment guide
├── app.js.backup           # Backup of original app.js (do not modify)
└── .gitignore              # Standard ignores (node_modules, .env, etc.)
```

### Key Files for Code Changes

- **Game Logic:** `app-tournament.js` (active), `app.js` (legacy/backup)
- **City Data:** `cities.js` - contains `cities`, `fixedStartCity`, `fixedEndCity` arrays
- **Styling:** `styles.css` - minimalist haute couture design system
- **Translation Strings:** `i18n.js` - all UI text in Spanish-Argentine
- **Firebase:** `config.js` - Firebase initialization

---

## Development Commands

### Running Locally

Always use Python's built-in HTTP server to test locally:

```bash
# From the repository root directory
python3 -m http.server 8080
```

Then access:
- Main game: `http://localhost:8080/index.html`
- Demo mode: `http://localhost:8080/demo.html`

**Note:** The main game requires Firebase credentials in `config.js` to function. The demo mode (`demo.html`) works offline without Firebase.

### Validation

There is no build system, linter, or test suite in this repository. To validate changes:

1. Start the local server: `python3 -m http.server 8080`
2. Open `http://localhost:8080/index.html` in a browser
3. Test the demo mode at `http://localhost:8080/demo.html` for offline validation
4. Check browser console for JavaScript errors

---

## Architecture Notes

### Game Modes

1. **Tournament Mode** (`index.html` + `app-tournament.js`):
   - 16 cities compete in knockout rounds (Round of 16 → Quarterfinals → Semifinals → Final)
   - Players write pros/cons during 1-minute writing phase
   - 5-minute debate phase with partner's arguments visible
   - Both players vote; disagreements extend debate by 1 minute (max 2 extensions)
   - Tiebreaker: random selection after max extensions
   - Final itinerary: London (start) → Top 3 winners → Madrid (end)

2. **Legacy Card Mode** (`app.js`):
   - Swipe-style interface (swipe right to choose, left to skip)
   - Simpler synchronous card progression

3. **Demo Mode** (`demo.html` + `demo.js`):
   - Single-player, no Firebase required
   - Uses same city data and styling

### Data Flow

- Firebase Realtime Database stores game state at `games/{gameCode}`
- Game states: `waiting` → `playing` → `finished`
- Tournament phases: `waiting` → `bracket` → `writing` → `debate` → (repeat) → `results`
- Votes stored at `votes/{matchKey}/{playerId}`
- Writing stored at `writing/{matchKey}/{playerId}`

### Design System

- Font: Helvetica Neue (weights: 200, 300, 400)
- Colors: Pink palette (#fcb6cb, #f7a5ba, #d4a5b0)
- Border radius: 2px (sharp, minimal)
- All UI text in Spanish-Argentine; use `i18n.t('key')` for translations

---

## Important Patterns

### Adding New Cities

Edit `cities.js`:
```javascript
{
    city: "CityName",
    country: "Country",
    emoji: "🏰",
    description: "Description in Spanish",
    image: "https://images.unsplash.com/...",
    preferred: false  // true for Milan/Rome only
}
```

### Adding UI Text

1. Add translation key to `i18n.js` in the `es-ar` translations object
2. Use `i18n.t('key.path')` in JavaScript code

### Modifying Firebase Structure

When modifying database structure in `app-tournament.js`:
- Update `setupGameListeners()` for new data listeners
- Ensure host/non-host player logic is handled correctly
- Use `gameState.isHost` to determine which player controls game flow

---

## File Dependencies

- `index.html` loads: `styles.css`, `i18n.js`, `config.js`, `cities.js`, `app-tournament.js`
- `demo.html` loads: `styles.css`, `cities.js`, `demo.js`
- `config.js` must load before `app-tournament.js` or `app.js`
- Firebase SDK loaded from CDN (`firebase-app-compat.js`, `firebase-database-compat.js`)

---

## Known Behaviors

- Game codes are 6 uppercase alphanumeric characters (no O/0/I/1 to avoid confusion)
- Milan and Rome are pre-selected as "preferred" cities in tournament
- Fixed start city: London (March 5)
- Fixed end city: Madrid (March 26)
- Timer intervals use `setInterval` - clear with `clearInterval(gameState.timerInterval)`
- Page unload removes player from Firebase to handle disconnections

---

## Trust These Instructions

These instructions accurately reflect the repository state. Only perform additional file exploration or searches if:
1. The instructions are incomplete for your specific task
2. You encounter errors that suggest the repository has changed
3. You need to understand implementation details not covered here

For most changes, the information above should be sufficient to begin work immediately.
