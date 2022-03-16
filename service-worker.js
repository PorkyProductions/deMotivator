importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.router.registerRoute(({ request }) => request.destination === 'image', new workbox.strategies.NetworkFirst());
