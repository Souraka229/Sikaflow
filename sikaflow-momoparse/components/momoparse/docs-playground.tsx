"use client";

import { useCallback, useState } from "react";

type EpId = "list" | "one" | "stats" | "tag";

const ENDPOINTS: {
  id: EpId;
  method: string;
  path: string;
  title: string;
  desc: string;
}[] = [
  {
    id: "list",
    method: "GET",
    path: "/api/v1/transactions",
    title: "Liste des transactions",
    desc: "Filtres query : operator, type, status, limit, cursor, reference, from, to (ISO).",
  },
  {
    id: "one",
    method: "GET",
    path: "/api/v1/transactions/:id",
    title: "Détail + SMS brut",
    desc: "Retourne la transaction et le corps SMS original pour debug / support.",
  },
  {
    id: "stats",
    method: "GET",
    path: "/api/v1/stats",
    title: "Statistiques agrégées",
    desc: "Volumes et compteurs (données de démo en mémoire sur cette instance).",
  },
  {
    id: "tag",
    method: "POST",
    path: "/api/v1/transactions/:id/tag",
    title: "Tagger une transaction",
    desc: "Body JSON : external_ref optionnel, metadata objet libre (ex. order_id Restafy).",
  },
];

function curlExample(
  ep: EpId,
  base: string,
  key: string,
  txId: string,
  tagJson: string
): string {
  switch (ep) {
    case "list":
      return `curl -s "${base}/api/v1/transactions?limit=5" \\
  -H "X-Api-Key: ${key || "VOTRE_CLE"}"`;
    case "one":
      return `curl -s "${base}/api/v1/transactions/${txId}" \\
  -H "X-Api-Key: ${key || "VOTRE_CLE"}"`;
    case "stats":
      return `curl -s "${base}/api/v1/stats" \\
  -H "X-Api-Key: ${key || "VOTRE_CLE"}"`;
    case "tag":
      return `curl -s -X POST "${base}/api/v1/transactions/${txId}/tag" \\
  -H "X-Api-Key: ${key || "VOTRE_CLE"}" \\
  -H "Content-Type: application/json" \\
  -d '${tagJson.replace(/'/g, "'\\''")}'`;
    default:
      return "";
  }
}

function jsExample(ep: EpId, base: string, key: string, txId: string, tagJson: string): string {
  switch (ep) {
    case "list":
      return `const r = await fetch("${base}/api/v1/transactions?limit=5", {
  headers: { "X-Api-Key": ${JSON.stringify(key || "YOUR_KEY")} },
});
const json = await r.json();`;
    case "one":
      return `const r = await fetch("${base}/api/v1/transactions/${txId}", {
  headers: { "X-Api-Key": ${JSON.stringify(key || "YOUR_KEY")} },
});
const json = await r.json();`;
    case "stats":
      return `const r = await fetch("${base}/api/v1/stats", {
  headers: { "X-Api-Key": ${JSON.stringify(key || "YOUR_KEY")} },
});
const json = await r.json();`;
    case "tag": {
      try {
        const o = JSON.parse(tagJson);
        return `const r = await fetch("${base}/api/v1/transactions/${txId}/tag", {
  method: "POST",
  headers: {
    "X-Api-Key": ${JSON.stringify(key || "YOUR_KEY")},
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${JSON.stringify(o)}),
});
const json = await r.json();`;
      } catch {
        return "// Corrigez le JSON du corps pour générer l’exemple JavaScript.";
      }
    }
    default:
      return "";
  }
}

export function DocsPlayground({ defaultApiKey }: { defaultApiKey: string }) {
  const [active, setActive] = useState<EpId>("list");
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [txId, setTxId] = useState("txn_7f2a9c1e001");
  const [tagBody, setTagBody] = useState(
    '{\n  "external_ref": "order_456",\n  "metadata": { "restaurant": "Chez Sika FLOW", "table": 12 }\n}'
  );
  const [snippetTab, setSnippetTab] = useState<"curl" | "js">("curl");
  const [response, setResponse] = useState<string>(
    '// Cliquez sur « Exécuter » — requête réelle vers cette app (même origine).'
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const base =
    typeof window !== "undefined" ? window.location.origin : "";

  const ep = ENDPOINTS.find((e) => e.id === active)!;

  const runRequest = useCallback(async () => {
    setLoading(true);
    setStatus(null);
    try {
      const headers: Record<string, string> = {
        "X-Api-Key": apiKey.trim(),
      };
      let url = "";
      let init: RequestInit = { method: "GET", headers };

      if (active === "list") {
        url = `${base}/api/v1/transactions?limit=5`;
      } else if (active === "one") {
        url = `${base}/api/v1/transactions/${encodeURIComponent(txId.trim())}`;
      } else if (active === "stats") {
        url = `${base}/api/v1/stats`;
      } else if (active === "tag") {
        let body: unknown;
        try {
          body = JSON.parse(tagBody);
        } catch {
          setResponse(JSON.stringify({ success: false, error: "JSON invalide dans le corps" }, null, 2));
          setStatus(400);
          setLoading(false);
          return;
        }
        url = `${base}/api/v1/transactions/${encodeURIComponent(txId.trim())}/tag`;
        init = {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
      }

      const res = await fetch(url, init);
      setStatus(res.status);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (e) {
      setResponse(JSON.stringify({ success: false, error: String(e) }, null, 2));
      setStatus(0);
    } finally {
      setLoading(false);
    }
  }, [active, apiKey, base, tagBody, txId]);

  const copyAi = useCallback(() => {
    const tagParsed =
      active === "tag"
        ? (() => {
            try {
              return JSON.stringify(JSON.parse(tagBody));
            } catch {
              return tagBody;
            }
          })()
        : "{}";
    const block = `## Sika FLOW API — ${ep.title}
- Method: ${ep.method}
- Path: ${ep.path}
- Auth: Header X-Api-Key (never commit keys)
- Description: ${ep.desc}

Example (${snippetTab}):
\`\`\`${snippetTab === "curl" ? "bash" : "typescript"}
${snippetTab === "curl" ? curlExample(active, base || "https://app.sikaflow.com", apiKey, txId, tagParsed) : jsExample(active, base || "https://app.sikaflow.com", apiKey, txId, tagParsed)}
\`\`\`
`;
    void navigator.clipboard.writeText(block);
  }, [active, apiKey, base, ep.desc, ep.method, ep.path, ep.title, snippetTab, tagBody, txId]);

  const tagJsonOneLine = (() => {
    try {
      return JSON.stringify(JSON.parse(tagBody));
    } catch {
      return tagBody;
    }
  })();

  return (
    <div className="sf-card-shadow flex flex-col gap-6 overflow-hidden rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface lg:grid lg:min-h-[560px] lg:grid-cols-[240px_1fr_minmax(280px,340px)]">
      <aside className="border-b border-mp-border lg:border-b-0 lg:border-r">
        <div className="p-3 text-[10px] font-bold uppercase tracking-widest text-mp-muted">
          Référence
        </div>
        <nav className="flex flex-col gap-1 p-2 lg:max-h-[520px] lg:overflow-y-auto">
          {ENDPOINTS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(e.id)}
              className={`rounded-full px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                active === e.id ? "bg-[#DFFF00] text-black" : "text-mp-muted hover:bg-mp-bg"
              }`}
            >
              <span className="font-mono text-[11px] font-bold">{e.method}</span>
              <span className="mt-0.5 block truncate text-xs">{e.path}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 space-y-4 border-b border-mp-border bg-mp-bg p-4 lg:border-b-0 lg:border-r">
        <div>
          <h2 className="text-lg font-bold text-mp-text">{ep.title}</h2>
          <p className="mt-1 font-mono text-xs font-semibold text-mp-text">{ep.method} {ep.path}</p>
          <p className="mt-2 text-sm font-medium text-mp-muted">{ep.desc}</p>
        </div>

        <div className="rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-4 sf-card-shadow">
          <p className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">
            Authentification
          </p>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-mp-bg p-3 font-mono text-[11px] text-mp-text">
            X-Api-Key: {apiKey.trim() || "…"}
          </pre>
          <p className="mt-2 text-xs text-mp-muted">
            En production, définissez <code className="font-mono">SIKAFLOW_API_KEYS</code> sur le serveur
            (plusieurs clés séparées par des virgules). En dev sans variable : clé par défaut{" "}
            <code className="rounded bg-[#DFFF00]/40 px-1 font-mono text-black">
              mklive_dev_sikaflow_local
            </code>
            .
          </p>
        </div>

        {(active === "one" || active === "tag") && (
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">
              ID transaction
            </label>
            <input
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
              className="mt-1 h-10 w-full rounded-full border border-mp-border bg-mp-surface px-3 font-mono text-xs"
            />
          </div>
        )}

        {active === "tag" && (
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-mp-muted">
              Corps JSON
            </label>
            <textarea
              value={tagBody}
              onChange={(e) => setTagBody(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-3 font-mono text-[11px] text-mp-text"
            />
          </div>
        )}

        <div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSnippetTab("curl")}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                snippetTab === "curl" ? "bg-black text-[#DFFF00]" : "bg-mp-bg text-mp-muted"
              }`}
            >
              cURL
            </button>
            <button
              type="button"
              onClick={() => setSnippetTab("js")}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                snippetTab === "js" ? "bg-black text-[#DFFF00]" : "bg-mp-bg text-mp-muted"
              }`}
            >
              JavaScript
            </button>
            <button
              type="button"
              onClick={copyAi}
              className="rounded-full border border-mp-border px-3 py-1.5 text-xs font-bold text-mp-text hover:border-black"
            >
              Copier pour l’IA
            </button>
          </div>
          <pre className="mt-2 max-h-48 overflow-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-surface p-3 font-mono text-[10px] leading-relaxed text-mp-text">
            {snippetTab === "curl"
              ? curlExample(active, base || "https://app.sikaflow.com", apiKey, txId, tagJsonOneLine)
              : jsExample(active, base || "https://app.sikaflow.com", apiKey, txId, tagJsonOneLine)}
          </pre>
        </div>

        <div className="flex flex-wrap gap-3 text-xs font-semibold text-mp-muted">
          <span>Réponses : 200 OK · 400 validation · 401 clé · 404 · 429 rate limit</span>
        </div>
      </section>

      <aside className="flex flex-col bg-mp-surface p-4">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-mp-muted">Console live</h3>
        <label className="mt-4 text-[10px] font-bold uppercase text-mp-muted">X-Api-Key</label>
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="mklive_…"
          className="mt-1 h-10 w-full rounded-full border border-mp-border bg-mp-bg px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-[#DFFF00]/50"
        />
        <button
          type="button"
          onClick={runRequest}
          disabled={loading || !apiKey.trim()}
          className="mt-4 flex h-11 items-center justify-center rounded-full bg-[#DFFF00] text-sm font-bold text-black transition-colors hover:bg-[#c8e600] disabled:opacity-50"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          ) : (
            "Exécuter la requête"
          )}
        </button>
        {status !== null && (
          <p className="mt-2 text-center text-xs font-bold text-mp-text">HTTP {status}</p>
        )}
        <pre className="mt-3 max-h-[min(50vh,320px)] flex-1 overflow-auto rounded-[var(--radius-mp-inner)] border border-mp-border bg-mp-bg p-3 font-mono text-[10px] leading-relaxed text-mp-text">
          {response}
        </pre>
      </aside>
    </div>
  );
}
