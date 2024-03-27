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
      document.head.appendChild(linkIcon);
    });

    const iconSizes = ['-16x16.png', '-32x32.png', '-150x150.png', '.ico'];

    iconSizes.forEach(back => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/favicon${back}`;
      document.head.appendChild(linkIcon);
    });
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
      <Toast />
    </Provider>
  );
}

export default App;
