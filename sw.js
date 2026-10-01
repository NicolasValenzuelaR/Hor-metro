const C="horo-v1",A=["./","index.html","manifest.webmanifest","logo.svg","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
e.respondWith(caches.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(e.request,y));return x}).catch(()=>r);return r||n}))});
