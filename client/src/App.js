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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const href = window.location.href;

    const found = faviconPaths.find(item => href.includes(item));
    if (!found) {
      return;
    }
    const domainName = found ? found : 'default';
    const path = `icons/favicons/${domainName}/favicon_package`;

    const title = document.getElementById('our-title');

    if (title) {
      title.innerHTML = `${domainName.replace('experience', 'application')}`;
    }

    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = `${path}/site.webmanifest`;
    document.head.appendChild(linkManifest);

    const linkAppleTouchIcon = document.createElement('link');
    linkAppleTouchIcon.rel = 'apple-touch-icon';
    linkAppleTouchIcon.href = `${path}/apple-touch-icon.png`;
    document.head.appendChild(linkAppleTouchIcon);

    const iconSizesAndroid = ['-192x192.png', '-512x512.png'];

    iconSizesAndroid.forEach(back => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/android-chrome${back}`;
      document.head.prepend(linkIcon);
    });

    const iconSizes = ['-16x16.png', '-32x32.png', '.ico'];

    iconSizes.forEach(back => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/favicon${back}`;
      document.head.prepend(linkIcon);
    });


    const linkIcon_150x150 = document.createElement('link');
    linkIcon_150x150.rel = 'icon';
    linkIcon_150x150.type = 'image/png';
    linkIcon_150x150.href = `${path}/mstile-150x150.png}`;
    document.head.prepend(linkIcon_150x150);
  }, []);

  const InstallModal = () => {
    return (
      <div className={'install-modal-back'}>
        <div className={'install-modal-body'}>
          <div className={'install-modal-title'}>
            Часто пользуетесь
            <br/>
            сайтом?
          </div>
          <div className={'install-modal-message'}>
            Скачайте его на рабочий экран что-бы иметь к нему быстрый доступ
          </div>
          <div className={'install-modal-button-container'}>
            <div onClick={() => {
              setShowModal(false)
            }} className={'install-modal-button install-modal-button-accept'}>
              Скачать
            </div>
            <div className={'install-modal-vertical-line'}>

            </div>
            <div onClick={() => {
              setShowModal(false);
            }} className={'install-modal-button install-modal-button-cancel'}>
              Отменить
            </div>
          </div>
        </div>
      </div>
    )
  }

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

  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
      <Toast />
      <div onClick={checkInstall}>
        скачать
      </div>
      {/*{showModal ? (<InstallModal />) : null}*/}
    </Provider>
  );
}

export default App;
