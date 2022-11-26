var CACHE_NAME = 'static-v1';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/Assets/Poppins-Bold.ttf,
        '/Assets/Poppins-Medium.ttf,
        '/Assets/Poppins-SemiBold.ttf,
        '/Assets/manifest.json,
        '/Letras/001-100.xhtml',
        '/Letras/101-200.xhtml',
        '/Letras/201-300.xhtml',
        '/Letras/301-400.xhtml',
        '/Letras/401-500.xhtml',
        '/Letras/501-600.xhtml',
        '/Letras/h333.xhtml',
        '/Styles/paginas.css',
      ]);
    })
  )
});

self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
