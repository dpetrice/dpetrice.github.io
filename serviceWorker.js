



const assets = [
 "/",
 index.html,
style.css,
app.js
 
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
      caches.open(staticDevCoffee).then(cache => {
          cache.addAll(assets)
      })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
          return res || fetch(fetchEvent.request)
      })
  )
})



const expectedCaches = ["dev-coffee-site-v1"];

self.addEventListener('install', event => {
console.log('V3 installingâ€¦');
caches.delete("dev-coffee-site-v1");
console.log("Old cache deleted");
// cache a horse SVG into a new cache, static-v2
caches.open(staticDevCoffee).then(cache => {
  cache.addAll(assets)
}) 
});


self.addEventListener('activate', event => {
console.log("Service worker activated, deleting cache now");
// delete any caches that aren't in expectedCaches
// which will get rid of static-v1
event.waitUntil(
  caches.keys().then(keys => Promise.all(
    keys.map(key => {
      if (!expectedCaches.includes(key)) {
        return caches.delete(key);
      }
    })
  )).then(() => {
    console.log('V2 now ready to handle fetches!');
  })
);
});



self.addEventListener('message', function(event) {
event.ports[0].postMessage({'test': 'This is my response.'});
});
