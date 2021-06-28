import firebase from 'firebase';

let firebaseApp = firebase.initializeApp({
// Your web app's Firebase configuration

    apiKey: "AIzaSyBK-mbThpMF0dwH74_jKMnIo6zlieZ7lxk",
    authDomain: "sunshine-ico-development.firebaseapp.com",
    projectId: "sunshine-ico-development",
    storageBucket: "sunshine-ico-development.appspot.com",
    messagingSenderId: "175257174270",
    appId: "1:175257174270:web:ec49b55f41a3ccde23e5af",
    measurementId: "G-EBDKK2S87N"

});

// Initialize Firebase
let db = firebaseApp.firestore();
let useStorage = firebaseApp.storage();
const auth = firebaseApp.auth();

export {db, useStorage, auth};
