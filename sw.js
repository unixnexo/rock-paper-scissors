/**
 * using storage api and service workers to make the website work offline
 */
// const CACHE_NAME = 'static_cache';
// const STATIC_ASSETS = [
//     './index.html',
//     './css/output.css',
//     './js/script.js',
//     './js/auto-animate-formkit.js',
//     './public/img/paper.webp',
//     './public/img/rock.webp',
//     './public/img/scissors.webp',
// ]

// async function preCache() {
//     const cache = await caches.open(CACHE_NAME);
//     return cache.addAll(STATIC_ASSETS);
// }

// self.addEventListener('install', (event) => {
//     event.waitUntil(preCache());
// });

// async function fetchAssets(event) {
//     try {
//         const response = await fetch(event.request);
//         return response;
//     } catch (error) {
//         console.log('Fetch failed; returning cached asset:', error);
//         const cache = await caches.open(CACHE_NAME);
//         return cache.match(event.request);
//     }
// }

// self.addEventListener('fetch', (event) => {
//     event.respondWith(fetchAssets(event));
// });


/////////testing this mother fucker the above code works only when simulating a offline mode
const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
}

const cacheMatch = async (request, preloadResponsePromise) => {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) return cachedResponse
    try {
        const preloadResponse = await preloadResponsePromise;
        if (preloadResponse) {
            const cache = await caches.open("v1")
            await cache.put(request, preloadResponse.clone())
            return preloadResponse
        }
        const networkResponse = await fetch(request)
        const cache = await caches.open("v1")
        await cache.put(request, networkResponse.clone())
        return networkResponse
    } catch (err) {
        return new Response("Response not found!")
    }
}

self.addEventListener("install", (event) => {
    self.skipWaiting()
    event.waitUntil(addResourcesToCache([
        './index.html',
        './css/output.css',
        './js/script.js',
        './js/auto-animate-formkit.js',
        './public/img/paper.webp',
        './public/img/rock.webp',
        './public/img/scissors.webp'
    ]))
})

self.addEventListener("activate", event => {
    event.waitUntil(clients.claim().then(() => alert("SW has claimed all the clients")))
    event.waitUntil(async () => {
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
    })
})
self.addEventListener("fetch", (event) => {
    event.respondWith(cacheMatch(event.request, event.preloadResponse))
})

