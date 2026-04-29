// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
        apiKey: "AIzaSyD_g49suLWESZZ377AxsL2G8JTcEBGT0tI",
    authDomain: "outage-login-947d8.firebaseapp.com",
    projectId: "outage-login-947d8",
        appId: "1:436354690312:web:3ed241912899af6a1450bd"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged };