const CACHE_NAME = 'app-static-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/app/'])));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // /app 配下のみ制御
  if (!url.pathname.startsWith('/app/')) return;

  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
