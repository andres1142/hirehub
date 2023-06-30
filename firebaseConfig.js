import { initializeApp , getApps } from "firebase/app";
import { getStorage as storage}  from "firebase/storage";
import { getFirestore  as firestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo6pE4oW5Eay22vT1h0uGbeNnyyf_PmRk",
  authDomain: "hirehub-d9316.firebaseapp.com",
  projectId: "hirehub-d9316",
  storageBucket: "hirehub-d9316.appspot.com",
  messagingSenderId: "610983730367",
  appId: "1:610983730367:web:f8790d9c32813f6dec3a0a",
  measurementId: "G-YBMZ56NP0Q"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);

function getAuthentication() {
  checkApp();
  return getAuth(app);
}

function getStorage() {
  checkApp();
  return storage(app)
}

function getFirestore() {
    checkApp();
    return firestore(app);
}

function checkApp() {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    }
}

export  { getAuthentication, getStorage, getFirestore }
