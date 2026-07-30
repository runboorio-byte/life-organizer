importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

var firebaseConfig = {
  apiKey: "AIzaSyCa8boBzTDq3AQRdni-I3En38d3-5ZaIv4",
  authDomain: "life-organizer-17dfc.firebaseapp.com",
  projectId: "life-organizer-17dfc",
  storageBucket: "life-organizer-17dfc.firebasestorage.app",
  messagingSenderId: "1039298486965",
  appId: "1:1039298486965:web:fb16bec088b41a3989d4fc"
};

firebase.initializeApp(firebaseConfig);

var messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message received:', payload);
  
  var title = (payload.notification && payload.notification.title) || 'منظّم حياتي';
  var body = (payload.notification && payload.notification.body) || '';
  
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'life-organizer'
  });
});

self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notification clicked');
  event.notification.close();
  
  var appUrl = 'https://runboorio-byte.github.io/life-organizer/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
          if (clientList[i].url.indexOf('script.google.com') !== -1 && clientList[i].focus) {
            return clientList[i].focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(appUrl);
        }
      })
  );
});
