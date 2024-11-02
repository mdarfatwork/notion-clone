import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPujBNmhcgNjPoqqnQMiaPjkRPTCYtYhk",
  authDomain: "notion-clone-arfat.firebaseapp.com",
  projectId: "notion-clone-arfat",
  storageBucket: "notion-clone-arfat.appspot.com",
  messagingSenderId: "1032467291159",
  appId: "1:1032467291159:web:cd582b7bcab1de2012d052"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app)

export { db };