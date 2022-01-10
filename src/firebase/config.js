import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMl6PUlAd97JOVVnHviTcAMadGPhhpqwE",
  authDomain: "nn-ud-02-01-22.firebaseapp.com",
  projectId: "nn-ud-02-01-22",
  storageBucket: "nn-ud-02-01-22.appspot.com",
  messagingSenderId: "834675252617",
  appId: "1:834675252617:web:498520948b5c1bbf3b5558",
};
// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
