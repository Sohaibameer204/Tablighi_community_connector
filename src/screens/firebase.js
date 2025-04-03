// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNLX51or95xteAQSF3AHFYsZ9LUi5vKTU",
  authDomain: "authentication-dc73f.firebaseapp.com",
  projectId: "authentication-dc73f",
  storageBucket: "authentication-dc73f.appspot.com",
  messagingSenderId: "948710751546",
  appId: "1:948710751546:web:87cb968c1d86cb2a3da403",
  measurementId: "G-F3N9TTT8GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth object for use in your app
export { auth };
