const CACHE_NAME = 'decora-group-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  'https://esm.sh/react@18.2.0',
  'https://esm.sh/react-dom@18.2.0/client',
  'https://esm.sh/react@18.2.0/jsx-runtime',
  'https://esm.sh/lucide-react@0.363.0',
  'https://esm.sh/@supabase/supabase-js@2',
  'https://firebasestorage.googleapis.com/v0/b/drossmediapro.appspot.com/o/decora%20group%2FLogo%20Decora%20Group-01.png?alt=media&token=790f60ef-0216-4181-ac70-bf781394543a',
  'https://decoragrouppuntacana.com/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll with a catch to prevent installation failure if one asset fails
        return cache.addAll(urlsToCache).catch(err => {
            console.error('Failed to cache all resources:', err);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});