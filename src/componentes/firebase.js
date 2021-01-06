import firebase from 'firebase';



var firebaseApp=firebase.initializeApp({
// Your web app's Firebase configuration

    apiKey: "AIzaSyDOpaSp7DF6J62vugkEiTkvILG4bElpeEI",
    authDomain: "ico-sunshine-contact.firebaseapp.com",
    projectId: "ico-sunshine-contact",
    storageBucket: "ico-sunshine-contact.appspot.com",
    messagingSenderId: "225520940002",
    appId: "1:225520940002:web:a0553cbc8de0719507ffbb"
  
});

  // Initialize Firebase
  var db =firebaseApp.firestore();

  export {db};