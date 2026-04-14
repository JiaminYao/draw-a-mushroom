// ===== Firebase Client Configuration =====
const firebaseConfig = {
    apiKey: "AIzaSyAt_BowGAilnRZj5s0366W2RSpjJbH-5g8",
    authDomain: "mushroom-game-c7205.firebaseapp.com",
    projectId: "mushroom-game-c7205",
    storageBucket: "mushroom-game-c7205.firebasestorage.app",
    messagingSenderId: "484914785040",
    appId: "1:484914785040:web:51754118f978fc1fea1395",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth instance
const auth = firebase.auth();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Auto-refresh token when Firebase detects auth state change
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const token = await user.getIdToken(true);
        MushroomUtils.saveAuth(token, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email,
        });
    } else {
        // User signed out (e.g. token revoked)
        if (MushroomUtils.isLoggedIn()) {
            MushroomUtils.logout();
            window.location.reload();
        }
    }
});
