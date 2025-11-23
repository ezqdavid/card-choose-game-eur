# 🚀 Production Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Easiest - Free)

**Step 1: Enable GitHub Pages**
1. Go to your repository: https://github.com/ezqdavid/card-choose-game-eur
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes, your site will be live at: `https://ezqdavid.github.io/card-choose-game-eur/`

**Step 2: Setup Firebase (Required for multiplayer)**
1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name: `card-game-eur` (or any name)
4. Disable Google Analytics (optional)
5. Click "Create project"

**Step 3: Enable Realtime Database**
1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click "Create Database"
3. Choose location (e.g., us-central1)
4. Start in **test mode** (we'll secure it later)
5. Click "Enable"

**Step 4: Get Firebase Config**
1. In Firebase Console, click the ⚙️ gear icon → **Project settings**
2. Scroll to "Your apps" section
3. Click the **</>** (Web) icon
4. Register app with nickname: "card-game-eur"
5. Copy the `firebaseConfig` object

**Step 5: Update config.js**
1. Edit `config.js` in your repository (on GitHub or locally)
2. Replace the placeholder config with your real Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456"
};
```

3. Commit and push to main branch

**Step 6: Set Database Security Rules**
1. In Firebase Console → Realtime Database → **Rules** tab
2. Replace with these rules:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": true,
        ".indexOn": ["createdAt", "status"]
      }
    }
  }
}
```

3. Click **Publish**

**Step 7: Test Your Game!**
- Open: `https://ezqdavid.github.io/card-choose-game-eur/`
- Test on your phone and your partner's phone
- Create a game, share the code, and play!

---

### Option 2: Firebase Hosting (Fast & Professional)

**Prerequisites:**
- Node.js installed (download from nodejs.org)
- Firebase CLI: `npm install -g firebase-tools`

**Deploy Steps:**

```bash
# 1. Login to Firebase
firebase login

# 2. Initialize Firebase in your project
cd /path/to/card-choose-game-eur
firebase init

# When prompted:
# - Select: Hosting, Realtime Database
# - Use existing project (select your Firebase project)
# - Public directory: . (current directory)
# - Single-page app: Yes
# - Don't overwrite index.html

# 3. Deploy
firebase deploy

# Your site will be live at: https://your-project-id.web.app/
```

**Update Database Rules:**
```bash
# Edit database.rules.json
firebase deploy --only database
```

---

### Option 3: Netlify (Alternative Free Option)

**Deploy via Drag & Drop:**
1. Go to https://app.netlify.com/drop
2. Drag your entire project folder
3. Your site is live instantly!

**Or via CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Then follow Firebase steps 2-6 above** to enable multiplayer.

---

### Option 4: Vercel (Modern Alternative)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Follow prompts
```

Then configure Firebase as described above.

---

## 🔧 Configuration Checklist

### ✅ Before Testing
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] `config.js` updated with real Firebase credentials
- [ ] Database rules published
- [ ] Code pushed to main branch
- [ ] Site deployed and accessible

### 🧪 Testing Checklist
- [ ] Open game on phone 1
- [ ] Create new game
- [ ] Note the 6-digit code
- [ ] Open game on phone 2
- [ ] Join with the code
- [ ] Both players see each other in waiting room
- [ ] Start tournament
- [ ] Test writing phase (1 min timer)
- [ ] Test debate phase (5 min timer)
- [ ] Test voting
- [ ] Complete tournament
- [ ] See final itinerary

---

## 🔒 Security (Production Ready)

### Better Database Rules (After Testing)

Replace test rules with these for production:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        ".read": true,
        ".write": "!data.exists() || data.child('players').child(auth.uid).exists()",
        ".indexOn": ["createdAt", "status"],
        "players": {
          "$playerId": {
            ".write": "auth.uid === $playerId"
          }
        },
        "writing": {
          "$matchKey": {
            "$playerId": {
              ".write": "auth.uid === $playerId"
            }
          }
        },
        "votes": {
          "$matchKey": {
            "$playerId": {
              ".write": "auth.uid === $playerId"
            }
          }
        }
      }
    }
  }
}
```

**Note:** This requires adding Firebase Authentication. For now, test mode is fine.

---

## 📱 Mobile Testing Tips

1. **Use Real Devices**: Test on actual phones, not just browser dev tools
2. **Different Networks**: One on WiFi, one on cellular (real-world scenario)
3. **Save to Home Screen**: Add as PWA for app-like experience
4. **Test Timers**: Ensure 1-min and 5-min timers work correctly
5. **Test Disconnection**: What happens if one player loses connection?

---

## 🐛 Troubleshooting

### "Firebase not configured" error
- Check that `config.js` has real Firebase credentials (not placeholder)
- Verify Firebase SDK loads (check browser console)

### "Game not found" error
- Database rules might be too restrictive
- Check Firebase Console → Database → Data tab
- Verify game is being created

### Timers not working
- Check JavaScript console for errors
- Ensure both players are connected
- Refresh page and rejoin

### Can't vote
- Wait for debate timer to complete
- Check that both players submitted writing
- Refresh if buttons are disabled

---

## 🎯 Recommended: GitHub Pages + Firebase

**Pros:**
- ✅ Free forever
- ✅ Easy to update (just push to main)
- ✅ Custom domain support
- ✅ HTTPS included
- ✅ Fast CDN

**Total Setup Time:** ~10 minutes

**Your URL:** `https://ezqdavid.github.io/card-choose-game-eur/`

---

## 📞 Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Check Firebase Console → Database → Data (see if data is saving)
3. Try demo.html first (works without Firebase)
4. Open an issue on GitHub with error details

---

## 🚀 Quick Start Command (After Firebase Setup)

```bash
# If using this repo locally
git clone https://github.com/ezqdavid/card-choose-game-eur.git
cd card-choose-game-eur

# Update config.js with your Firebase credentials
# Then push to trigger GitHub Pages deployment
git add config.js
git commit -m "Add Firebase config"
git push origin main

# Wait 2 minutes, then visit:
# https://ezqdavid.github.io/card-choose-game-eur/
```

**That's it! Your game is live! 🎉**
