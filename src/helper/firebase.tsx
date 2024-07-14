// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2EeRyTasVGNMZmcoeSRs7QgSKQ8vIS6s",
  authDomain: "font-1fc2a.firebaseapp.com",
  projectId: "font-1fc2a",
  storageBucket: "font-1fc2a.appspot.com",
  messagingSenderId: "642306946184",
  appId: "1:642306946184:web:1813c9d2c2703ea4ab9b3d",
  measurementId: "G-N4T323SK83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };