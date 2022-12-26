const CACHE_NAME = 'cool-cache';

// Add whichever assets you want to precache here:
const PRECACHE_ASSETS = [
    '/Assets/',
    '/Letras/001-100.xhtml',
    '/Letras/101-200.xhtml',
    '/Letras/201-300.xhtml',
    '/Letras/301-400.xhtml',
    '/Letras/401-500.xhtml',
    '/Letras/501-600.xhtml',
    '/Letras/h001.xhtml',
    '/Letras/h002.xhtml',
    '/h003.xhtml',
    '/h004.xhtml',
    '/h005.xhtml',
    '/h006.xhtml'
]

// Listener for the install event - precaches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(async () => {
      const cache = await caches.open(CACHE_NAME);

      // match the request to our cache
      const cachedResponse = await cache.match(event.request);

      // check if we got a valid response
      if (cachedResponse !== undefined) {
          // Cache hit, return the resource
          return cachedResponse;
      } else {
        // Otherwise, go to the network
          return fetch(event.request)
      };
  });
});
