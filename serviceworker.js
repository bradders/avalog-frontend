const now = 1551312564;
const version = "002";
const staticCacheName = "avalog:static:" + version;
const pagesCacheName = "avalog:pages:" + version;

const cacheList = [
    staticCacheName,
    pagesCacheName
];

const offlinePages = [
  '/',
  '/regions'
];

const offlineAssets = [
  '/offline',
  'https://cdn.avalog.co/js/app.js'];

function updateStaticCache() {
    return caches.open(staticCacheName)
    .then( cache => {
        // These items won't block the installation of the Service Worker
        cache.addAll([
          "https://cdn.avalog.co/svg/feather/menu.svg",
          "https://cdn.avalog.co/svg/feather/link.svg",
          "https://cdn.avalog.co/svg/feather/wifi-off.svg",
          "https://cdn.avalog.co/svg/feather/wifi-off-white.svg"
        ].concat(offlinePages));
        // These items must be cached for the Service Worker to complete installation
        return cache.addAll(offlineAssets);
    });
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
    caches.open(cacheName)
    .then( cache => {
        cache.keys()
        .then(keys => {
            if (keys.length > maxItems) {
                cache.delete(keys[0])
                .then(trimCache(cacheName, maxItems));
            }
        });
    });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
    return caches.keys()
    .then( keys => {
        return Promise.all(keys
            .filter(key => !cacheList.includes(key))
            .map(key => caches.delete(key))
        );
    });
}

addEventListener('install', event => {
    event.waitUntil(
        updateStaticCache()
        .then( () => {
          skipWaiting()
        })
    );
});

addEventListener('activate', event => {
    event.waitUntil(
        clearOldCaches()
        .then( () => {
            clients.claim()
        })
    );
});

addEventListener('message', event => {
    if (event.data.command == 'trimCaches') {
        trimCache(pagesCacheName, 35);
    }
});

addEventListener('fetch', event => {
    let request = event.request;
    let url = new URL(request.url);

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // For HTML requests, try the network first, fall back to the cache, finally the offline page
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
            .then( responseFromFetch => {
                                return responseFromFetch;
            })
            .catch( fetchError => {
                console.error(fetchError);
                // CACHE or FALLBACK
                return caches.match(request)
                .then( responseFromCache => {
                    return responseFromCache || caches.match('/offline');
                });
            })
        );
        return;
    }

    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
        caches.match(request)
        .then(responseFromCache => {
            // CACHE
            return responseFromCache || fetch(request)
            .then( responseFromFetch => {
                // NETWORK
                return responseFromFetch;
            })
            .catch( fetchError => {
                console.error(fetchError);
                // OFFLINE
            });
        })
    );
});
