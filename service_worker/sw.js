self.addEventListener('install', function(ev) {
  console.log('install worker event');
});

self.addEventListener('activate', function(ev) {
  console.log('activate worker event');
});

self.addEventListener('fetch', function(ev) {
    if (ev.request.url.endsWith('.worker')) {
        ev.respondWith(new Response('<strong>This url exists !</strong>',
            {headers:
              {"Content-type":"text/html"}
            }));
    }
});
