// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-vivek.firebaseapp.com",
  projectId: "estate-vivek",
  storageBucket: "estate-vivek.firebasestorage.app",
  messagingSenderId: "628194496189",
  appId: "1:628194496189:web:543ecb1641538d4a49f1d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);