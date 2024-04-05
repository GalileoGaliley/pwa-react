import React, {useEffect} from "react";

import './App.css';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from './store';
import Router from "./Router";
import { Toast } from './Toast';

const faviconPaths = [
  'red-experience',
  'yellow-experience',
  'blue-experience',
];

function App() {

  useEffect(() => {
    const href = window.location.href;
    const found = faviconPaths.find(item => href.includes(item));
    const domainName = found ? found : 'default';
    const path = `icons/favicons/${domainName}/favicon_package`;

    const title = document.getElementById('our-title');

    if (title) {
      title.innerHTML = `${domainName.replace('experience', 'application')}`;
    }

    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = `${path}/manifest.json`;
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

    const iconSizes = ['-16x16.png', '-32x32.png', '-150x150.png', '.ico'];

    iconSizes.forEach(back => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/favicon${back}`;
      document.head.prepend(linkIcon);
    });
  }, []);

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Показать вашу кнопку или баннер для установки
    showInstallButton();
  });

  function showInstallButton() {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'block';
    installButton.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
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
        <button className={'button'} id={'installButton'} onClick={showInstallButton}> скочать</button>
      </div>
      <Toast />
    </Provider>
  );
}

export default App;
