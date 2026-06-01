const CACHE_NAME = "quantumhub-v1";

const urlsToCache = [

"/",
"index.html",
"notes.html",
"timer.html",
"profile.html",
"search.html",
"privacy.html",
"contact.html"

];

self.addEventListener("install", event => {

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache => {

return cache.addAll(urlsToCache);

})

);

});

self.addEventListener("fetch", event => {

event.respondWith(

caches.match(event.request)

.then(response => {

return response || fetch(event.request);

})

);

});