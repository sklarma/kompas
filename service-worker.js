const CACHE_NAME = 'kompas-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/@ionic/core@latest/css/ionic.bundle.css',
  'https://cdn.jsdelivr.net/npm/@ionic/core@latest/dist/ionic.js',
  './komponenty/compass3.png',
  './komponenty/arrow.png',
  './komponenty/AppIcon-512@2x.png'
];

// Instalace Service Workeru
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache otevřená');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Cache chyba:', err))
  );
  self.skipWaiting();
});

// Aktivace Service Workeru
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Staré cache vymazáno:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - offline first strategie
self.addEventListener('fetch', (event) => {
  // Vynechat CDN požadavky na HTTPS
  if (event.request.url.includes('cdn.jsdelivr.net')) {
    // Pokusit se získat z internetu, fallback na cache
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Pro ostatní: nejdřív cache, pak síť
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            // Nekešovat ne-200 odpovědi
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Klonovat response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // Offline fallback
        return new Response('Offline - aplikace není dostupná', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
