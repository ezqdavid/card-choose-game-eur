// Firebase configuration
// For demo purposes, using a public Firebase config
// In production, use environment variables and security rules
const firebaseConfig = {
    apiKey: "AIzaSyDemoKeyForCardGameEurope123456789",
    authDomain: "card-game-eur-demo.firebaseapp.com",
    databaseURL: "https://card-game-eur-demo-default-rtdb.firebaseio.com",
    projectId: "card-game-eur-demo",
    storageBucket: "card-game-eur-demo.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Note: This is a demo configuration. To make this work in production:
// 1. Create a Firebase project at https://firebase.google.com/
// 2. Enable Realtime Database
// 3. Replace the config above with your actual Firebase config
// 4. Set up database security rules

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Fallback: The app will work in local-only mode
}
