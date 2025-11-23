// Firebase configuration
// IMPORTANT: These are placeholder/demo credentials and will NOT work
// To use this app, you MUST:
// 1. Create your own Firebase project at https://firebase.google.com/
// 2. Enable Realtime Database
// 3. Replace the config below with your actual Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyAuf7tRXKmUGuA-3Ro4__AfGB6wgaxkXwI",
    authDomain: "card-choose-game-eur.firebaseapp.com",
    databaseURL: "https://card-choose-game-eur-default-rtdb.firebaseio.com",
    projectId: "card-choose-game-eur",
    storageBucket: "card-choose-game-eur.firebasestorage.app",
    messagingSenderId: "1007358603482",
    appId: "1:1007358603482:web:4789983f3b9737656575e3"
  };

// Note: This is a demo configuration that will NOT work.
// To make this work in production:
// 1. Create a Firebase project at https://firebase.google.com/
// 2. Enable Realtime Database
// 3. Replace the config above with your actual Firebase config from your project settings
// 4. Set up database security rules in Firebase Console

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Fallback: The app will work in local-only mode
}
