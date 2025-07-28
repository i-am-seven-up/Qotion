// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKAmB5meL747G8mHVLepW3EZC1imo1pes",
    authDomain: "qotion-6175c.firebaseapp.com",
    projectId: "qotion-6175c",
    storageBucket: "qotion-6175c.firebasestorage.app",
    messagingSenderId: "168514253081",
    appId: "1:168514253081:web:6ef92b11238f0b44ab9588",
    measurementId: "G-WG64R35X1N"
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };