import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTC_jBxPVC8-AoQBBvRk8DVKN-1ShvVK4",
  authDomain: "ecomercecoder-6dd2c.firebaseapp.com",
  projectId: "ecomercecoder-6dd2c",
  storageBucket: "ecomercecoder-6dd2c.appspot.com",
  messagingSenderId: "100665339897",
  appId: "1:100665339897:web:08eee3eafa7b8485b4d728"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <App />
  </React.Fragment>
)
