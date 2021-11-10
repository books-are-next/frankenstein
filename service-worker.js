/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-4a822a4';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./frankenstein_001.html","./frankenstein_002.html","./frankenstein_006.html","./frankenstein_007.html","./frankenstein_005.html","./frankenstein_008.html","./frankenstein_009.html","./frankenstein_010.html","./frankenstein_011.html","./frankenstein_012.html","./frankenstein_013.html","./frankenstein_014.html","./frankenstein_015.html","./frankenstein_016.html","./frankenstein_017.html","./frankenstein_018.html","./frankenstein_019.html","./frankenstein_021.html","./frankenstein_020.html","./frankenstein_022.html","./frankenstein_023.html","./frankenstein_024.html","./frankenstein_025.html","./frankenstein_026.html","./frankenstein_027.html","./frankenstein_028.html","./frankenstein_029.html","./frankenstein_030.html","./frankenstein_031.html","./frankenstein_032.html","./frankenstein_033.html","./index.html","./manifest.json","./resources.html","./scripts/bundle.js","./style/style.min.css","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/index.xml","./resources/obalka_frankenstein_fmt.png","./resources/upoutavka_eknihy_fmt.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
