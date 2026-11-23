const C="elgamed-library-v9";
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest'])).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('elgamed-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(C);await c.put(e.request,r.clone());}return r;}).catch(async()=>await caches.match(e.request)||await caches.match('index.html')));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));}return res;})));
});
