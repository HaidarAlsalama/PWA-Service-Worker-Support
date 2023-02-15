const CACHE_NAME = 'onlineStore-cache-v1';
const urlsToCache = [
  '/onlineStore/',
  '/onlineStore/index.html',
    '/onlineStore/manifest.json',
  '/onlineStore/js/main.js',
  '/onlineStore/css/main.css',
  '/onlineStore/img/rings.png'

];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            console.log('Cache hit for', event.request.url);
            return response;
          }
          console.log('Cache miss for', event.request.url);
          return fetch(event.request);
        })
    );
  });
  
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });