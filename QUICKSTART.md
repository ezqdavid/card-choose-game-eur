# Quick Start Guide

## 🚀 Immediate Demo (No Setup Required)

**Want to try it right now?**

1. Open `demo.html` in your web browser
2. Enter your name
3. Click "Start Demo"
4. Swipe or click buttons to choose cities
5. See your European itinerary!

The demo mode works completely offline and doesn't require any setup.

## 🌐 Full Multiplayer Setup

To play with your partner on two phones with real-time sync:

### Step 1: Firebase Setup (One-time)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and create a new project
3. Once created, go to "Build" → "Realtime Database"
4. Click "Create Database" and start in test mode
5. Go to Project Settings (⚙️ icon) → "General"
6. Scroll to "Your apps" and click the web icon `</>`
7. Register your app and copy the Firebase configuration

### Step 2: Update Configuration

1. Open `config.js` in a text editor
2. Replace the placeholder config with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

### Step 3: Set Database Rules

In Firebase Console → Realtime Database → Rules, use:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

⚠️ **Note:** These rules allow anyone to read/write. For production, implement proper authentication and security rules.

### Step 4: Deploy

**Option A: Simple Python Server (for testing)**
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 on both phones (use your computer's IP address)

**Option B: GitHub Pages (free hosting)**
1. Push to GitHub
2. Go to repo Settings → Pages
3. Select branch and save
4. Share the URL with your partner

**Option C: Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Step 5: Play Together!

**Player 1 (Host):**
1. Open the game URL on your phone
2. Enter your name
3. Click "Create New Game"
4. Share the 6-digit code with your partner

**Player 2:**
1. Open the same game URL on your phone
2. Enter your name
3. Enter the game code
4. Click "Join Game"

**Both Players:**
1. Host clicks "Start Game"
2. Swipe right or click ✓ to choose a city
3. Swipe left or click ✗ to skip
4. Wait for your partner after each choice
5. See which cities you both chose!

## 📱 Tips

- Works best on mobile phones with touch support
- Requires internet connection for multiplayer
- Game codes expire after inactivity
- Each game is for 2 players only
- All 20 cities must be reviewed before seeing results
- Cities chosen by both players are highlighted in green

## 🎯 Customization

**Add Your Own Cities:**
Edit `cities.js` and add entries like:
```javascript
{
    city: "Venice",
    country: "Italy",
    emoji: "🛶",
    description: "Canals and gondolas"
}
```

**Change Colors:**
Edit `styles.css` - look for color codes like `#667eea`

## ❓ Troubleshooting

**"Firebase not configured" error:**
- Make sure you updated `config.js` with real Firebase credentials
- Check that Firebase Realtime Database is enabled

**Can't join game:**
- Verify the game code is correct (6 characters)
- Make sure the host hasn't started the game yet
- Check that both phones are connected to internet

**Cards not syncing:**
- Check internet connection on both devices
- Verify Firebase database rules are set correctly
- Look at browser console for error messages

## 🎉 Enjoy Planning Your Trip!

Have fun choosing your European adventure together! 🌍✈️
