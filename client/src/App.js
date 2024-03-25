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
    const head = document.getElementsByTagName('head');
    const href = window.location.href;
    const found = faviconPaths.find((item) => href.includes(item) ? item : null);
    const domainName = found ? `${found}` : 'default';
    const path = `/icons/favicons/${domainName}/favicon_package`;

    const faviconPath = `${path}/favicon.ico`;
    const manifestPath = `${path}/site.webmanifest`;
    const faviconPath16x16 = `${path}/favicon-16x16.png`;
    const faviconPath32x32 = `${path}/favicon-32x32.png`;
    const faviconPath150x150 = `${path}/favicon-150x150.png`;
    const faviconPath192x192 = `${path}/favicon-192x192.png`;
    const faviconPath512x512 = `${path}/favicon-512x512.png`;

    const linkManifest = document.createElement('link');

    linkManifest.rel = 'manifest';
    // linkManifest.type = 'text/json';
    linkManifest.href = manifestPath;
    head[0].append(linkManifest);

    const linkAndroidIcon = document.createElement('link');

    linkAndroidIcon.rel = 'apple-touch-icon';
    linkAndroidIcon.type = 'image/png';
    linkAndroidIcon.href = faviconPath192x192;
    head[0].append(linkAndroidIcon);

    for (const link of [
      faviconPath,
      faviconPath16x16,
      faviconPath32x32,
      faviconPath150x150,
      faviconPath512x512,
    ]) {
      const linkFavicon = document.createElement('link');
      linkFavicon.rel = 'icon';
      linkFavicon.type = 'image/png';
      linkFavicon.href = link;
      head[0].append(linkFavicon);
    }
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
