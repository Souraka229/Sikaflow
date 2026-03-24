"use client";

import { useEffect, useRef, useState } from "react";
import { getVapidPublicKey, urlBase64ToUint8Array } from "@/lib/push/web-push-client";

const STORAGE_DISMISSED = "sikaflow_pwa_notif_dismissed";
const AUTO_TRIED = "sikaflow_pwa_auto_perm_v1";
const SYNC_CACHE = "sikaflow_push_subscription_json";
const FRESH_INSTALL = "sikaflow_pwa_fresh_install";

function dismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_DISMISSED) === "1";
  } catch {
    return false;
  }
}

function setDismissed() {
  try {
    localStorage.setItem(STORAGE_DISMISSED, "1");
  } catch {
    /* ignore */
  }
}

function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

async function syncPushSubscription(): Promise<void> {
  const vapid = getVapidPublicKey();
  if (!vapid) return;

  const authRes = await fetch("/api/v1/auth/user", { credentials: "include" });
  if (!authRes.ok) return;

  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapid),
    });
  }

  const json = JSON.stringify(sub.toJSON());
  try {
    if (localStorage.getItem(SYNC_CACHE) === json) return;
  } catch {
    /* ignore */
  }

  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: json,
  });

  if (res.ok) {
    try {
      localStorage.setItem(SYNC_CACHE, json);
    } catch {
      /* ignore */
    }
  }
}

/**
 * PWA : enregistre le service worker, tente automatiquement la permission notifications
 * en mode installé / juste après installation, pousse l’abonnement Web Push (VAPID) si l’utilisateur
 * est connecté. Bandeau de secours si le navigateur exige encore une confirmation.
 */
export function PwaNotificationsAuto() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const busy = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.isSecureContext) return;
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;

    async function runFlow() {
      if (busy.current) return;
      busy.current = true;
      try {
        try {
          await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        } catch (e) {
          console.error("[PWA] enregistrement du service worker impossible", e);
          return;
        }
        if (cancelled) return;

        const standalone = isStandaloneDisplay();
        let freshInstall = false;
        try {
          freshInstall = sessionStorage.getItem(FRESH_INSTALL) === "1";
        } catch {
          /* ignore */
        }

        if (!standalone && !freshInstall) return;

        if (!("Notification" in window)) return;

        if (Notification.permission === "granted") {
          await syncPushSubscription();
          return;
        }
        if (Notification.permission === "denied") return;

        let autoTried = false;
        try {
          autoTried = localStorage.getItem(AUTO_TRIED) === "1";
        } catch {
          /* ignore */
        }

        if (!autoTried) {
          try {
            localStorage.setItem(AUTO_TRIED, "1");
          } catch {
            /* ignore */
          }
          let result: NotificationPermission = "denied";
          try {
            result = await Notification.requestPermission();
          } catch {
            /* ignore */
          }
          if (cancelled) return;
          if (result === "granted") {
            await syncPushSubscription();
            return;
          }
        }

        if (dismissed()) return;
        queueMicrotask(() => {
          if (!cancelled) setBannerOpen(true);
        });
      } finally {
        busy.current = false;
      }
    }

    const onInstalled = () => {
      try {
        sessionStorage.setItem(FRESH_INSTALL, "1");
      } catch {
        /* ignore */
      }
      void runFlow();
    };

    window.addEventListener("appinstalled", onInstalled);

    queueMicrotask(() => {
      void runFlow();
    });

    const mq = window.matchMedia("(display-mode: standalone)");
    const onMq = () => {
      if (mq.matches) void runFlow();
    };
    mq.addEventListener("change", onMq);

    return () => {
      cancelled = true;
      window.removeEventListener("appinstalled", onInstalled);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  async function onAllow() {
    try {
      await Notification.requestPermission();
    } catch {
      /* ignore */
    }
    setBannerOpen(false);
    if (Notification.permission === "granted") {
      await syncPushSubscription();
    }
    if (Notification.permission === "denied") {
      setDismissed();
    }
  }

  function onLater() {
    setDismissed();
    setBannerOpen(false);
  }

  if (!bannerOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      role="dialog"
      aria-labelledby="pwa-perm-title"
      aria-describedby="pwa-perm-desc"
    >
      <div className="mx-auto max-w-lg rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-4 sf-card-shadow-lg">
        <h2 id="pwa-perm-title" className="text-sm font-bold text-mp-text">
          Activer les notifications
        </h2>
        <p id="pwa-perm-desc" className="mt-2 text-xs font-medium leading-relaxed text-mp-muted">
          En mode application installée, nous avons besoin de votre accord pour les alertes. Après
          validation, l’abonnement push est enregistré automatiquement si vous êtes connecté et si{" "}
          <code className="rounded bg-mp-bg px-1 font-mono text-[10px]">NEXT_PUBLIC_VAPID_PUBLIC_KEY</code>{" "}
          est configuré sur le serveur.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void onAllow()}
            className="rounded-full bg-[#DFFF00] px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#c8e600]"
          >
            Autoriser
          </button>
          <button
            type="button"
            onClick={onLater}
            className="rounded-full border border-mp-border bg-mp-bg px-4 py-2.5 text-sm font-semibold text-mp-text"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
