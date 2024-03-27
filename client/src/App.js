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
    const head = document.getElementsByTagName('head');
    const found = faviconPaths.find(item => href.includes(item));
    const domainName = found ? found : 'default';
    const path = `/icons/favicons/${domainName}/favicon_package`;

    const linkManifest = document.createElement('link');
    linkManifest.rel = 'manifest';
    linkManifest.href = `${path}/manifest.json`;
    head[0].prepend(linkManifest);

    const linkAppleTouchIcon = document.createElement('link');
    linkAppleTouchIcon.rel = 'apple-touch-icon';
    linkAppleTouchIcon.href = `${path}/apple-touch-icon.png`;
    head[0].prepend(linkAppleTouchIcon);

    const iconSizesAndroid = ['android-chrome-192x192.png', 'android-chrome-512x512.png'];

    iconSizesAndroid.forEach(back => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/${back}`;
      head[0].prepend(linkIcon);
    });

    const iconSizes = ['favicon-16x16.png', 'favicon-32x32.png', 'mstile-150x150.png','android-chrome-192x192.png', 'android-chrome-512x512.png'];

    const linkIconFavicon = document.createElement('link');
    linkIconFavicon.rel = 'icon';
    // linkIconFavicon.type = 'image/png';
    linkIconFavicon.href = `${path}/favicon.ico?v=M44lzPylqQ`;
    head[0].prepend(linkIconFavicon);

    iconSizes.forEach(name => {
      const linkIcon = document.createElement('link');
      linkIcon.rel = 'icon';
      linkIcon.type = 'image/png';
      linkIcon.href = `${path}/${name}`;
      head[0].prepend(linkIcon);
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
