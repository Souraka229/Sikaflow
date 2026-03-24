/* global self */
self.addEventListener("push", (event) => {
  let title = "Sika FLOW";
  let body = "Nouvelle activité sur votre compte.";
  let url = "/dashboard";
  if (event.data) {
    try {
      const payload = event.data.json();
      if (payload.title) title = String(payload.title);
      if (payload.body) body = String(payload.body);
      if (payload.url) url = String(payload.url);
    } catch {
      const t = event.data.text();
      if (t) body = t;
    }
  }
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
      tag: "sikaflow-default",
      renotify: true,
      data: { url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const path = event.notification.data?.url || "/dashboard";
  const url = new URL(path, self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    }),
  );
});
