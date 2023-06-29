// Файл index.js

import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
import App from './App';


const firebaseConfig = {
  apiKey: "AIzaSyBv-owO0mVJ2JVpC-2hk5vAU_UFIe_BG28",
  authDomain: "pwa-typescript-app.firebaseapp.com",
  projectId: "pwa-typescript-app",
  storageBucket: "pwa-typescript-app.appspot.com",
  messagingSenderId: "540647554690",
  appId: "1:540647554690:web:5edf1b09a42d11f83afe9b",
  measurementId: "G-DPERV33091"
};

firebase.initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(async (registration) => {
      const messaging = firebase.messaging();
      const token = await messaging.getToken();
      console.log('token', token);
    })
    .catch((error) => {
      console.error('Ошибка при регистрации сервисного рабочего узла:', error);
    });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
