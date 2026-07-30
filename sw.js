const CACHE_NAME = 'haccp-lotti-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'style.css',
  'app.js',
  'manifest.json',
  'icon.jpg'
];

// Installazione Service Worker - Pre-cache dei file locali di base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching core assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Attivazione Service Worker - Pulizia vecchi cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercettazione richieste di rete - Strategia Cache-First con salvataggio dinamico
self.addEventListener('fetch', (event) => {
  // Ignoriamo richieste non GET (es. POST)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Se la risorsa è in cache, la restituiamo (velocità e offline)
        return cachedResponse;
      }

      // Altrimenti la scarichiamo dalla rete
      return fetch(event.request).then((networkResponse) => {
        // Verifichiamo se la risposta è valida
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
          return networkResponse;
        }

        // Cloniamo la risposta per salvarla in cache
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Salviamo in cache tutti i file JS, WASM e assets di terze parti (Tesseract, SheetJS, ecc.)
          // Questo assicura che al primo avvio online vengano scaricati e poi rimangano sempre offline
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch((err) => {
        console.error('[Service Worker] Fetch failed offline:', err);
        // Se siamo offline e non c'è in cache, fallisce silenziosamente
      });
    })
  );
});
