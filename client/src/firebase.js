// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import app from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiDgt0GEkRHGChraEWM5QjoUeGHCeaQCI",
  authDomain: "ecommerce-website-47994.firebaseapp.com",
  projectId: "ecommerce-website-47994",
  storageBucket: "ecommerce-website-47994.appspot.com",
  messagingSenderId: "248547283972",
  appId: "1:248547283972:web:0b8a3961254492a3979151",
  measurementId: "G-5PYP566S7J",
};

const firebase = app.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const auth = firebase.auth();

export { firestore, firebase, auth };
