# 🗺️ European Cities Card Challenge

A synchronized card-choosing game for couples to plan their European travel itinerary together!

## 🎮 Features

- **Real-time Synchronization**: Play together on two phones simultaneously
- **20 European Cities**: Choose from popular destinations across Europe
- **Swipe Interface**: Tinder-style card swiping for easy mobile interaction
- **Mutual Choices**: See which cities both partners want to visit
- **Beautiful Design**: Mobile-first, responsive design with smooth animations

## 🚀 Quick Start

### Option 1: Local Testing (No Firebase)
1. Open `index.html` in your web browser
2. Note: Synchronization won't work without Firebase setup

### Option 2: Full Setup with Firebase (Recommended)

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the steps
   - Enable **Realtime Database** in the Firebase console

2. **Get Firebase Configuration**
   - In Firebase Console, go to Project Settings
   - Scroll down to "Your apps" and click the web icon (</>)
   - Copy your Firebase configuration

3. **Update Configuration**
   - Open `config.js`
   - Replace the demo Firebase config with your actual config:
   ```javascript
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-app.firebaseapp.com",
       databaseURL: "https://your-app.firebaseio.com",
       projectId: "your-project-id",
       storageBucket: "your-app.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
   };
   ```

4. **Set Database Rules**
   - In Firebase Console, go to Realtime Database > Rules
   - Use these rules for testing (⚠️ Update for production):
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

5. **Deploy**
   - Host on Firebase Hosting, GitHub Pages, or any web server
   - Or use a local server: `python3 -m http.server 8000`

## 📱 How to Play

1. **Player 1 (Host):**
   - Open the game on your phone
   - Enter your name
   - Click "Create New Game"
   - Share the 6-digit game code with your partner

2. **Player 2:**
   - Open the game on your phone
   - Enter your name
   - Enter the game code
   - Click "Join Game"

3. **Playing:**
   - Host clicks "Start Game"
   - Swipe right (or click ✓) to choose a city
   - Swipe left (or click ✗) to skip
   - Wait for your partner to make their choice
   - Continue through all 20 cities

4. **Results:**
   - See all chosen cities
   - Cities chosen by both partners are highlighted
   - Plan your trip based on mutual choices!

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Firebase Realtime Database
- **Design**: Mobile-first responsive design
- **Features**: Touch gestures, real-time sync, animations

## 📁 File Structure

```
card-choose-game-eur/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── app.js             # Game logic and Firebase integration
├── cities.js          # European cities data
├── config.js          # Firebase configuration
└── README.md          # Documentation
```

## 🔧 Customization

### Adding More Cities
Edit `cities.js` and add entries following this format:
```javascript
{
    city: "City Name",
    country: "Country",
    emoji: "🏰",
    description: "Brief description"
}
```

### Changing Styles
Modify `styles.css` - all colors and animations are easily customizable.

### Game Logic
Adjust game mechanics in `app.js` (card count, timing, etc.)

## 🌐 Browser Support

- Chrome/Edge (Desktop & Mobile) ✅
- Safari (Desktop & Mobile) ✅
- Firefox (Desktop & Mobile) ✅

## 📝 Notes

- Works best on mobile devices with touch support
- Requires internet connection for synchronization
- Game sessions expire after inactivity
- No user data is stored permanently

## 🎯 Future Enhancements

- Add more cities and regions
- User authentication
- Save game history
- Share itinerary feature
- Map visualization
- Travel tips for each city

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

---

**Enjoy planning your European adventure! 🌍✈️**