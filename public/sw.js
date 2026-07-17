self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.registration.unregister()
    .then(() => {
      return self.clients.claim();
    })
    .then(() => {
      console.log('Service Worker unregistered successfully.');
    });
});
