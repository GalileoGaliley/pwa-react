self.addEventListener('push', function(event) {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: '/logo512.png', // путь к иконке уведомления
      badge: '/logo512.png', // путь к значку уведомления (например, для мобильных устройств)
      image: '/logo512.png', // путь к изображению, отображаемому в уведомлении
      actions: [ // действия, отображаемые в уведомлении (например, кнопки)
        { action: 'action1', title: 'Action 1', icon: 'path/to/action1.png' },
        { action: 'action2', title: 'Action 2', icon: 'path/to/action2.png' }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        // Добавьте сюда другие ресурсы вашего приложения
      ]);
    })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker активирован');
});

// Событие Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
