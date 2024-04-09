import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

if ('serviceWorker' in navigator) {
  console.log('serviceWorker');

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../serviceWorker.js')
      .then(function(registration) {
      console.log('Service worker registered with scope:', registration.scope);
    }, function(err) {
      console.error('Service worker registration failed:', err);
    });
  });
} else {
  console.log('no service worker');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
