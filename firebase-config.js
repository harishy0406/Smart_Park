// Firebase web configuration for the browser CDN scripts used in the HTML files.
// This project uses Firebase v8 compat scripts:
// firebase-app.js and firebase-database.js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase only once. This avoids duplicate-app errors during reloads.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const slotRef = database.ref("parkingSlot");
