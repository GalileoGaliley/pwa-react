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

const faviconPathsOther = [
  'asg',
  'brucite',
  'geo',
  'korovka',
  'makfa',
  'megafon',
  'mts',
  'nloto',
  'proektirovanie',
  'raiff',
  'smeg',
  'sargazarm',
  'tele2',
  'men-day',
  'aclub',
  'womens-day'
];

function App() {
  useEffect(() => {
    const head = document.getElementsByTagName('head');
    const href = window.location.href;
    const finded = faviconPaths.find((item) => href.includes(item) ? item : null);
    const domainName = 'tele2';
    const path = 'favicon/other-favicon/favicon';

    const faviconPath = `${path}${domainName}.ico`;
    const faviconPath16x16 = `${path}${domainName}16x16.png`;
    const faviconPath32x32 = `${path}${domainName}32x32.png`;

    for (const link of [faviconPath, faviconPath16x16, faviconPath32x32]) {
      const linkFavicon = document.createElement('link');
      linkFavicon.rel = 'icon';
      linkFavicon.type = 'image/png';
      linkFavicon.href = link;
      head[0].prepend(linkFavicon);
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
