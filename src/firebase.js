// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, runTransaction } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDUrJd6ZXdUZ3x5Q_KrNRAfI10_XM0zE5s",
  authDomain: "sample-firebase-ai-app-e2b6c.firebaseapp.com",
  projectId: "sample-firebase-ai-app-e2b6c",
  storageBucket: "sample-firebase-ai-app-e2b6c.appspot.com",
  messagingSenderId: "1023831833694",
  appId: "1:1023831833694:web:a2c86c60dcfc75a8a248cf",
  databaseURL: "https://sample-firebase-ai-app-e2b6c-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase
