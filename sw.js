// =================================================================================
// SERVICE WORKER - ADVANCED CACHING STRATEGY
// =================================================================================

const CACHE_NAME = "academynow-fahrschule-v2.4.2";
const STATIC_CACHE = "academynow-static-v12";
const DYNAMIC_CACHE = "academynow-dynamic-v12";

// Critical resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/styles.css?v=20251128-002",
  "/css/mobile.css?v=20251128-002",
  "/js/main.js?v=20251128-002",
  "/images/logo_favicon.webp",
  "/images/logo_social.png",
  "/images/heroBackground/mercedes-hero-optimized.jpg",
  "/images/heroBackground/mercedes-hero-placeholder.jpg",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Montserrat:wght@600;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
];

// Install event - Cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // NICHT automatisch skippen - warten auf User-Bestätigung via updateApp()
        // self.skipWaiting() wird über Message-Handler aufgerufen
      })
      .catch((error) => {
        // Silent fail in production
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - Advanced caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-http requests and chrome-extension requests
  if (
    !request.url.startsWith("http") ||
    request.url.includes("chrome-extension")
  ) {
    return;
  }

  // Different strategies for different types of requests
  if (request.destination === "image") {
    // Images: Cache first, network fallback
    event.respondWith(cacheFirstStrategy(request, DYNAMIC_CACHE));
  } else if (request.destination === "document") {
    // HTML: Network first, cache fallback
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  } else if (
    request.destination === "script" ||
    request.destination === "style"
  ) {
    // CSS/JS: Cache first, network fallback
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else {
    // Everything else: Network first, cache fallback
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  }
});

// Cache First Strategy (for static assets)
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response("Offline content not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Network First Strategy (for dynamic content)
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page for document requests
    if (request.destination === "document") {
      return caches.match("/index.html");
    }

    return new Response("Content not available offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Background sync for form submissions (if supported)
self.addEventListener("sync", (event) => {
  if (event.tag === "contact-form-submission") {
    event.waitUntil(submitPendingForms());
  }
});

async function submitPendingForms() {
  // Implementation for offline form submission queuing
}

// Push notifications (for future implementation)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "Neue Nachricht von AcademyNow Fahrschule",
    icon: "/images/logo_favicon.webp",
    badge: "/images/logo_favicon.webp",
    tag: "academynow-notification",
    renotify: true,
    actions: [
      {
        action: "view",
        title: "Anzeigen",
      },
      {
        action: "dismiss",
        title: "Schließen",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("AcademyNow Fahrschule", options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Message handling for communication with main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
