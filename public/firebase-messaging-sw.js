
import {onMessage} from "firebase/messaging";

onMessage(function(payload) {
  console.log('Message received. ', payload);

  // регистрируем пустой ServiceWorker каждый раз
  navigator.serviceWorker.register('messaging-sw.js');

  // запрашиваем права на показ уведомлений если еще не получили их
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        // теперь мы можем показать уведомление
        return registration.showNotification(payload.notification.title, payload.notification);
      }).catch(function(error) {
        console.log('ServiceWorker registration failed', error);
      });
    }
  });
});
