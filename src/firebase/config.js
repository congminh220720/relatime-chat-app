import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGm6mIrJbfRzTKjKvBiBUlqESfgY2-ISo",
  authDomain: "fun-chat-e047e.firebaseapp.com",
  projectId: "fun-chat-e047e",
  storageBucket: "fun-chat-e047e.appspot.com",
  messagingSenderId: "936491518604",
  appId: "1:936491518604:web:182f8c4b58144df8ed49a9",
  measurementId: "G-ETKBC5Q3RS",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");

if (window.location.hostname === "localhost") {
  db.useEmulator("localhost", "8080");
  auth.useEmulator("http://localhost:9099");
}

export { db, auth };
export default firebase;
