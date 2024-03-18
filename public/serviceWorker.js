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