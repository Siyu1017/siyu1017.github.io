// sw.js
const STATIC_NAME = 'static'

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(STATIC_NAME)
            cache.addAll([
                './index.html',
                './index.js',
                './index.css',
                "./icons/android-chrome-512x512.png",
                './favicon.ico'
            ])
        })()
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys()
            Promise.allSettled(keys.map(key => key !== STATIC_NAME ? caches.delete(key) : null))
        })()
    )
    clients.claim()
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const res = await caches.match(event.request)
            return res ? res : fetch(event.request)
        })()
    )
})