import React, {useEffect, useState} from "react";

import './App.css';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from './store';
import Router from "./Router";
import { Toast } from './Toast';
import {axiosInstance as axios} from "./services/api";

const faviconPaths = [
  'red-experience',
  'yellow-experience',
  'blue-experience',
];

function App() {
  const checkInstall = () => {
    let deferredPrompt;
    console.log(1);
    window.addEventListener('beforeinstallprompt',  async(e) => {
      e.preventDefault();
      deferredPrompt = e;
      deferredPrompt.prompt();

      await axios.post('/log/output', JSON.stringify({
        e: JSON.stringify(e)
      }))
      await deferredPrompt.userChoice.then(async (choiceResult) => {
        await axios.post('/log/output', JSON.stringify({
          data: choiceResult,
        }))
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь согласился установить приложение');
        } else {
          console.log('Пользователь отказался устанавливать приложение');
        }
        deferredPrompt = null;
      });
    });
  }

  useEffect(() => {
    setTimeout(() => {
      checkInstall();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
      <Toast />
      {/*{showModal ? (<InstallModal />) : null}*/}
    </Provider>
  );
}

export default App;
