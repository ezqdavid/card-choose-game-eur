# 🚀 QUICK SETUP FOR TESTING

## For @ezqdavid - Get your game live in 10 minutes!

### Step 1: Create Firebase Project (3 minutes)

1. Go to https://console.firebase.google.com/
2. Click "**Add project**"
3. Name it: `card-game-eur-test`
4. Click through (disable Analytics if you want)
5. Click "**Create project**"

### Step 2: Enable Realtime Database (2 minutes)

1. In left sidebar, click "**Build**" → "**Realtime Database**"
2. Click "**Create Database**"
3. Choose location: **United States** (or closest to you)
4. Start in "**test mode**" → Click "**Enable**"
5. You'll see an empty database - that's perfect!

### Step 3: Get Your Firebase Config (2 minutes)

1. Click the ⚙️ gear icon (top left) → "**Project settings**"
2. Scroll down to "**Your apps**"
3. Click the **</>** icon (Web app)
4. App nickname: `card-game`
5. Click "**Register app**"
6. **COPY** the `firebaseConfig` object (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "card-game-eur-test.firebaseapp.com",
  databaseURL: "https://card-game-eur-test-default-rtdb.firebaseio.com",
  projectId: "card-game-eur-test",
  storageBucket: "card-game-eur-test.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

### Step 4: Update Your Code (2 minutes)

1. Go to your repo: https://github.com/ezqdavid/card-choose-game-eur
2. Click on `config.js` file
3. Click the ✏️ pencil icon to edit
4. **Replace lines 5-11** with your Firebase config from Step 3
5. Scroll down, add commit message: "Add Firebase config"
6. Click "**Commit changes**" to main branch

### Step 5: Enable GitHub Pages (1 minute)

1. In your repo, click "**Settings**" tab
2. In left sidebar, click "**Pages**"
3. Under "Source", select: **main** branch
4. Click "**Save**"
5. Wait 1-2 minutes...

### Step 6: Test! 🎮

Your game is now live at:
**`https://ezqdavid.github.io/card-choose-game-eur/`**

**Testing with your partner:**
1. **You**: Open the link on your phone
2. Enter your name → Click "**Create New Game**"
3. You'll see a 6-digit code like "**ABC123**"
4. **Partner**: Open same link on their phone
5. Enter their name → Enter the code → "**Join Game**"
6. **You** will see both names → Click "**Continue to City Selection**"
7. Select 16 cities (Milan & Rome already selected)
8. Click "**Start Tournament**"
9. Play through the matches!

---

## 🎮 How to Play

### City Selection
- Milan & Rome are pre-selected (preferred)
- Click cities to select/deselect
- Need exactly 16 cities
- Can add custom cities with the form

### Each Match
1. **Writing Phase (1 min)**
   - Write pros & cons for BOTH cities
   - Timer counts down
   - Textareas auto-save

2. **Debate Phase (5 min)**
   - See your partner's arguments
   - Discuss together
   - Timer counts down

3. **Voting**
   - Both click "Choose This City" button
   - If you both choose the SAME city → Winner advances!
   - If you choose DIFFERENT cities → +1 min debate, then revote

### Tournament Structure
- **Round 1**: 16 cities → 8 matches → 8 winners
- **Semifinals**: 8 cities → 4 matches → 4 winners  
- **Finals**: 4 cities → 2 matches → 2 winners
- **Championship**: 2 cities → 1 match → 1 winner
- **Top 3** go in your itinerary!

### Final Itinerary
**London (March 5)** → Top 3 Winners → **Madrid (March 26)**

---

## 🐛 Troubleshooting

### "Firebase not configured"
- Make sure you updated `config.js` with YOUR Firebase config
- Check that you committed to the **main** branch
- Wait 1-2 minutes for GitHub Pages to rebuild

### "Game not found"
- Make sure both phones have internet
- Double-check the game code (case-sensitive)
- Try creating a new game

### Images not loading
- Check your internet connection
- Images are from Unsplash (free CDN)
- Should load automatically

### Timer not counting down
- Refresh the page
- Make sure Firebase is configured correctly
- Check browser console (F12) for errors

---

## 📱 Best Experience

- **Use real phones** (not just browser)
- **Good internet** on both devices
- **Chrome or Safari** browser
- **Add to Home Screen** for app feel
- **Fullscreen** for immersion

---

## 🔄 Making Changes

After initial setup, to make changes:

1. Edit files on GitHub
2. Commit to main branch  
3. Wait 1-2 minutes
4. Refresh your game URL

Or clone locally:
```bash
git clone https://github.com/ezqdavid/card-choose-game-eur.git
cd card-choose-game-eur
# Make changes
git add .
git commit -m "Your changes"
git push origin main
```

---

## ✅ Checklist

Before testing:
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] config.js updated with real credentials
- [ ] Changes committed to main branch
- [ ] GitHub Pages enabled
- [ ] Waited 2 minutes for deployment

Ready to test:
- [ ] URL opens: https://ezqdavid.github.io/card-choose-game-eur/
- [ ] Can create game and get code
- [ ] Partner can join with code
- [ ] Can select cities
- [ ] Can start tournament
- [ ] Timers work
- [ ] Images load
- [ ] Voting works

---

**🎉 Enjoy planning your European trip!**

Questions? Check:
- Full guide: `DEPLOYMENT.md`
- README: `README.md`
- Firebase docs: https://firebase.google.com/docs
