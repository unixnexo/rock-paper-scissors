/**
 * using storage api and service workers to make the website work offline
 */
const CACHE_NAME = 'static_cache';
const STATIC_ASSETS = [
    '/index.html',
    '/css/output.css',
    '/js/script.js',
    '/js/auto-animate-formkit.js',
    '/public/img/paper.webp',
    '/public/img/rock.webp',
    '/public/img/scissors.webp',
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS);
}

self.addEventListener('install', (event) => {
    event.waitUntil(preCache());
});

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (error) {
        console.log('Fetch failed; returning cached asset:', error);
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

self.addEventListener('fetch', (event) => {
    event.respondWith(fetchAssets(event));
});

