// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWRBtdwihXo7FIO0h_jjw7NI2hirYzTAQ",
    authDomain: "wedding-invitation-ef24f.firebaseapp.com",
    projectId: "wedding-invitation-ef24f",
    storageBucket: "wedding-invitation-ef24f.firebasestorage.app",
    messagingSenderId: "155128398789",
    appId: "1:155128398789:web:86a19f278b88007b77c1ac",
    measurementId: "G-Q2P3EE51F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app