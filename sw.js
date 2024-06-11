/**
 * using storage api and service workers to make the website work offline,
 * IMPO: on ios the site should be through HTTPS in order for this to work
 */
// const CACHE_NAME = 'STATIC_ASSETS_v1';

// const addResourcesToCache = async (resources) => {
//     const cache = await caches.open(CACHE_NAME);
//     await cache.addAll(resources);
// }

// const cacheMatch = async (request, preloadResponsePromise) => {
//     const cachedResponse = await caches.match(request)
//     if (cachedResponse) return cachedResponse
//     try {
//         const preloadResponse = await preloadResponsePromise;
//         if (preloadResponse) {
//             const cache = await caches.open(CACHE_NAME)
//             await cache.put(request, preloadResponse.clone())
//             return preloadResponse
//         }
//         const networkResponse = await fetch(request)
//         const cache = await caches.open(CACHE_NAME)
//         await cache.put(request, networkResponse.clone())
//         return networkResponse
//     } catch (err) {
//         return null
//     }
// }

// self.addEventListener("install", (event) => {
//     self.skipWaiting()
//     event.waitUntil(addResourcesToCache([
//         './index.html',
//         './css/output.css',
//         './js/script.js',
//         './js/auto-animate-formkit.js',
//         './public/img/paper.webp',
//         './public/img/rock.webp',
//         './public/img/scissors.webp'
//     ]))
// })

// self.addEventListener("activate", event => {
//     event.waitUntil(clients.claim().then(() => console.log("SW has claimed all the clients")))
//     event.waitUntil(async () => {
//         if (self.registration.navigationPreload) {
//             await self.registration.navigationPreload.enable();
//         }
//     })
// })
// self.addEventListener("fetch", (event) => {
//     event.respondWith(cacheMatch(event.request, event.preloadResponse))
// })


// test
const CACHE_NAME = 'STATIC_ASSETS_v1';

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
}

const cacheMatch = async (request, preloadResponsePromise) => {
    const isOnline = navigator.onLine;
    // If the user is online, fetch the resource from the network
    if (isOnline) {
        try {
            const networkResponse = await fetch(request);
            // If the network response is successful, cache it and return
            if (networkResponse && networkResponse.ok) {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, networkResponse.clone());
                return networkResponse;
            }
        } catch (err) {
            return null;
        }
    }

    // If the user is offline or network fetch fails, try to find a cached response
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    if (isOnline) {
        return null;
    }

    // If user is offline and no cached response is found, return a fallback response
    return new Response("You are offline and there's no cached version of this resource.", { status: 503 });
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
    event.waitUntil(clients.claim().then(() => console.log("SW has claimed all the clients")))
    event.waitUntil(async () => {
        if (self.registration.navigationPreload) {
            await self.registration.navigationPreload.enable();
        }
    })
})
self.addEventListener("fetch", (event) => {
    event.respondWith(cacheMatch(event.request, event.preloadResponse))
})


