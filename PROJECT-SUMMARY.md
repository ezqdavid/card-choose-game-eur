# 🎀 Project Summary - European Cities Tournament Game

## ✨ What Was Built

A sophisticated, minimalistic tournament-style game for couples to plan their European travel itinerary together. Featuring real-time synchronization, beautiful haute couture design, and head-to-head city battles.

---

## 🎨 Design - Minimalistic Haute Couture

### Inspiration
- **Lazaro** bridal collections
- **Monique Lhuillier** minimalist elegance
- **Vera Wang** sophisticated aesthetics
- High-end fashion/bridal boutique vibe

### Color Palette
```
Primary Pink:     #fcb6cb, #f7a5ba
Rose Accents:     #d4a5b0, #a88790
Soft Blush:       #fef5f7, #fff9fb, #ffeef4
Mint Success:     #a8d4b0, #98c9a3
Text Grays:       #4a4a4a, #6a6a6a, #8a8a8a
```

### Typography
- **Font Family**: Helvetica Neue
- **Weights**: 200 (ultra-light), 300 (light), 400 (regular)
- **Letter-spacing**: 1-3px for elegance
- **Text-transform**: Uppercase for headers
- **Style**: Minimalist, refined, delicate

### Design Elements
- **Borders**: Delicate 1px, light pink (#f7d4dd, #fcecf0)
- **Corners**: Sharp 2px radius (not rounded)
- **Shadows**: Barely visible, soft pink tint
- **Gradients**: Subtle, elegant transitions
- **Spacing**: Generous whitespace
- **Buttons**: Flat with elegant hovers
- **Images**: Subtle opacity, refined borders

---

## 🎮 Game Mechanics

### Structure
**Fixed Itinerary:**
- 📍 **Start**: London (March 5, 2025)
- 🏆 **Middle**: Top 3 tournament winners
- 📍 **End**: Madrid (March 26, 2025)

### Tournament Format
- **16 cities** enter the tournament
- **Milan & Rome** are pre-selected (preferred destinations)
- **Knockout Format**: Round of 16 → Quarters → Semis → Final
- **Top 3** cities make the itinerary

### Each Match
1. **Writing Phase (1 minute)** ⏱️
   - Both players write pros & cons for BOTH cities
   - Elegant timer countdown
   - Auto-save to Firebase

2. **Debate Phase (5 minutes)** 💬
   - See partner's arguments side-by-side
   - Discuss together (voice/video separately)
   - Beautiful comparison cards with images

3. **Voting** ✅
   - Both players choose one city
   - **If both agree**: Winner advances, loser eliminated
   - **If disagree**: +1 minute extended debate, then revote
   - Must reach agreement to proceed

### City Selection
- Grid of 18 European cities
- Milan & Rome pre-selected
- Select exactly 16 cities total
- Add custom cities with images
- Elegant hover states

---

## 🖼️ City Images

All cities include beautiful landmark photos from Unsplash:

| City | Landmark | Image |
|------|----------|-------|
| London | London Eye | ✅ |
| Madrid | Royal Palace | ✅ |
| Milan | Duomo di Milano | ✅ |
| Rome | Colosseum | ✅ |
| Paris | Eiffel Tower | ✅ |
| Barcelona | Sagrada Familia | ✅ |
| Amsterdam | Canals | ✅ |
| Prague | Castle | ✅ |
| Vienna | Schönbrunn Palace | ✅ |
| Lisbon | Belém Tower | ✅ |
| Berlin | Brandenburg Gate | ✅ |
| Budapest | Parliament | ✅ |
| Edinburgh | Castle | ✅ |
| Dubrovnik | Old Town Walls | ✅ |
| Copenhagen | Nyhavn | ✅ |
| Stockholm | Gamla Stan | ✅ |
| Athens | Parthenon | ✅ |
| Florence | Duomo | ✅ |
| Santorini | Oia Village | ✅ |
| Porto | Ribeira District | ✅ |
| Bruges | Belfry | ✅ |
| Venice | Grand Canal | ✅ |
| Seville | Plaza de España | ✅ |

---

## 📱 Features

### Real-Time Sync
- **Firebase Realtime Database** for live updates
- Both players see changes instantly
- Game state synchronized across devices
- Writing, voting, bracket updates in real-time

### Mobile-First
- Touch-friendly interface
- Responsive grid layouts
- Optimized for phones
- Works on tablets and desktop
- Elegant at all screen sizes

### Interactions
- Smooth animations
- Hover states
- Touch gestures ready
- Timer countdowns
- Progress indicators

---

## 🏗️ Technical Stack

### Frontend
- **HTML5**: Semantic, accessible structure
- **CSS3**: Custom design system, no frameworks
- **JavaScript**: Vanilla JS, no dependencies (except Firebase)

### Backend
- **Firebase Realtime Database**: Live synchronization
- **Firebase Hosting**: Optional deployment
- No server-side code needed

### Images
- **Unsplash API**: High-quality landmark photos
- CDN hosted, fast loading
- Fallback images for custom cities

### Deployment
- **GitHub Pages**: Free, fast, HTTPS
- **Firebase Hosting**: Alternative option
- **Netlify/Vercel**: Also supported

---

## 📁 File Structure

```
card-choose-game-eur/
├── index.html                  # Main tournament UI
├── styles.css                  # Haute couture design (1409 lines)
├── app-tournament.js           # Tournament game logic
├── cities.js                   # 18 cities with images
├── config.js                   # Firebase configuration
├── demo.html                   # Standalone demo (no Firebase)
├── demo.js                     # Demo game logic
├── README.md                   # Project documentation
├── DEPLOYMENT.md               # Full deployment guide
├── QUICKSTART-TESTING.md       # 10-minute setup
├── .gitignore                  # Ignore patterns
└── app.js.backup               # Original version backup
```

---

## 🚀 Deployment Steps

### Quick Setup (10 minutes)

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Create project: "card-game-eur"
   - Enable Realtime Database

2. **Get Config**
   - Project Settings → Your apps → Web
   - Copy firebaseConfig object

3. **Update Code**
   - Edit `config.js`
   - Replace demo config with your config
   - Commit to main branch

4. **Enable GitHub Pages**
   - Repo Settings → Pages
   - Source: main branch
   - Save

5. **Test!**
   - URL: `https://ezqdavid.github.io/card-choose-game-eur/`
   - Open on two phones
   - Create/join game
   - Play tournament!

See `QUICKSTART-TESTING.md` for detailed instructions.

---

## 🎯 User Flow

### Player 1 (Host)
1. Open game URL
2. Enter name
3. Click "Create New Game"
4. Get 6-digit code (e.g., "ABC123")
5. Wait for partner
6. Select 16 cities
7. Start tournament
8. Play matches
9. See final itinerary

### Player 2
1. Open same URL
2. Enter name
3. Enter game code
4. Join game
5. See host's city selection
6. Play matches together
7. See final itinerary

### Match Flow
1. See two cities with images
2. Write pros/cons (1 min)
3. Read partner's thoughts
4. Discuss together (5 min)
5. Both vote
6. Winner advances or extend debate
7. Repeat until tournament complete

---

## ✅ Quality Assurance

### Code Review
- ✅ All code reviewed
- ✅ Duplicate CSS removed
- ✅ Tournament logic corrected
- ✅ Consistent design system

### Security
- ✅ CodeQL scan: 0 vulnerabilities
- ✅ No secrets in code
- ✅ Firebase rules template provided
- ✅ Safe image URLs (Unsplash)

### Testing
- ✅ UI tested in browser
- ✅ Mobile viewport verified
- ✅ Design screenshot captured
- ✅ All screens functional

### Performance
- ✅ Minimal dependencies
- ✅ Efficient CSS (1409 lines)
- ✅ Optimized images (CDN)
- ✅ Fast page load

---

## 🎨 Design System Reference

### Buttons
```css
Primary: Light pink gradient, uppercase, 1px border
Secondary: White with pink border, minimal
Vote: Same as primary, elegant hover
```

### Cards
```css
Background: White with pink tint
Border: 1px #fcecf0
Shadow: Subtle pink 0.12 opacity
Radius: 2px (sharp, not rounded)
```

### Typography Scale
```css
H1: 26px, weight 300, letter-spacing 3px, uppercase
H2: 22px, weight 300, letter-spacing 2px
H3: 16px, weight 400, letter-spacing 1px
Body: 14px, weight 300, line-height 1.6
Small: 12px, weight 300, letter-spacing 0.5px
```

### Spacing Scale
```css
xs:  8px
sm:  12px
md:  15px-18px
lg:  20px-25px
xl:  30px-35px
xxl: 40px+
```

---

## 💡 Usage Tips

### For Best Experience
- Use real phones (not just browser dev tools)
- Good internet connection on both devices
- Chrome or Safari browser
- Add to home screen for app-like feel
- Use voice/video call app for debate phase

### Customization
- Edit `cities.js` to add/remove cities
- Edit `styles.css` to change colors
- Edit tournament rounds in `app-tournament.js`
- Add custom cities during game

### Troubleshooting
- **Firebase error**: Check config.js has real credentials
- **Can't join**: Check game code, internet connection
- **Images not loading**: Check Unsplash URLs, internet
- **Timer issues**: Refresh page, check Firebase connection

---

## 🌟 Future Enhancements

Possible additions:
- [ ] User authentication
- [ ] Save game history
- [ ] Share itinerary (PDF, image)
- [ ] Map visualization of route
- [ ] Travel dates calculator
- [ ] Budget estimator
- [ ] City information panels
- [ ] More cities (30+)
- [ ] Different regions (Asia, Americas)
- [ ] Multiple game modes
- [ ] Achievements/badges
- [ ] Social sharing

---

## 📄 License

MIT License - Free to use and modify

---

## 👏 Credits

- **Design Inspiration**: Lazaro, Monique Lhuillier, Vera Wang
- **Images**: Unsplash (free high-quality photos)
- **Icons**: Emoji (native, no dependencies)
- **Backend**: Firebase (Google)
- **Hosting**: GitHub Pages

---

## 🎀 Final Notes

This game combines elegance with functionality. Every pixel is designed to feel luxurious and refined, like planning your trip in a high-end boutique.

The minimalistic design ensures the focus stays on what matters: choosing the perfect cities for your romantic European adventure together.

**Built with love for couples who appreciate both beauty and adventure.** 💕✈️

---

**Enjoy planning your European getaway!** 🗺️🎀
