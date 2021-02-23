import firebase from 'firebase';

let firebaseApp = firebase.initializeApp({
// Your web app's Firebase configuration

    apiKey: "AIzaSyDHjddOZb0Vuh9wNsuC1tXgWqMSGTP8Kmw",
    authDomain: "sunshine-ico.firebaseapp.com",
    projectId: "sunshine-ico",
    storageBucket: "sunshine-ico.appspot.com",
    messagingSenderId: "263506901293",
    appId: "1:263506901293:web:6193ece489b199e575bba4",
    measurementId: "G-7Y0616KDLP"

});

// Initialize Firebase
let db = firebaseApp.firestore();
let useStorage = firebaseApp.storage();
const fire = firebaseApp.auth();

export {db, useStorage, fire};
