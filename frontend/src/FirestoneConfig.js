/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
/*This code is not production ready */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Add your Firebase config details here // 
const firebaseConfig = {
  apiKey: "AIzaSyBp3R3y4rKcKfbVVggl71TVDCcxb_u_trY",
  authDomain: "doit-poc-421417.firebaseapp.com",
  projectId: "doit-poc-421417",
  storageBucket: "doit-poc-421417.appspot.com",
  messagingSenderId: "549733735963",
  appId: "1:549733735963:web:f3bb3989b8762ea8f322be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider }