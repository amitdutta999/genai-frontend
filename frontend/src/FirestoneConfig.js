/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

// Add your Firebase config details here // 
const firebaseConfig = {
  apiKey: "AIzaSyBavdMsAjtN6G-cLxnU8jdNx8j1Quggg64",
  authDomain: "genai-poc-398814.firebaseapp.com",
  projectId: "genai-poc-398814",
  storageBucket: "genai-poc-398814.appspot.com",
  messagingSenderId: "856988007023",
  appId: "1:856988007023:web:cb24e10b4f5ab3da38eb9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}