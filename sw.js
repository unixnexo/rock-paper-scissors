const CACHE_NAME = 'static_cache';
const STATIC_ASSETS = [
    '/index.html',
    '/css/output.css',
    '/js/script.js',
    '/public/img/paper.png',
    '/public/img/rock.png',
    '/public/img/scissors.png',
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(STATIC_ASSETS);
}

self.addEventListener('install', (event) => {
    console.log('install');
    event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
    console.log('activate');
});

async function fetchAssets(event) {
    try {
        const response = await fetch(event.request);
        return response;
    } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

self.addEventListener('fetch', (event) => {
    console.log('fetch');
    event.respondWith(fetchAssets(event));

});

