"use client";

import { useState } from "react";

const endpoints = [
  { id: "list", method: "GET", path: "/api/v1/transactions", title: "List transactions" },
  { id: "one", method: "GET", path: "/api/v1/transactions/:id", title: "Transaction detail" },
  { id: "stats", method: "GET", path: "/api/v1/stats", title: "Stats" },
  { id: "tag", method: "POST", path: "/api/v1/transactions/:id/tag", title: "Tag transaction" },
];

export function DocsClient() {
  const [active, setActive] = useState(endpoints[0].id);
  const [apiKey, setApiKey] = useState("mklive_xxxxxxxx");
  const [response, setResponse] = useState<string>("// Send a request to see JSON here");
  const [loading, setLoading] = useState(false);

  const ep = endpoints.find((e) => e.id === active) ?? endpoints[0];

  async function sendRequest() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const mock = {
      success: true,
      data: [],
      meta: { total: 0, hasMore: false, nextCursor: null },
    };
    setResponse(JSON.stringify(mock, null, 2));
    setLoading(false);
  }

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col gap-4 lg:grid lg:grid-cols-[220px_1fr_300px] lg:gap-0 lg:rounded-[8px] lg:border lg:border-white/[0.08] lg:overflow-hidden">
      <aside className="hidden lg:block lg:border-r lg:border-white/[0.08] lg:bg-mp-surface">
        <div className="p-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Endpoints
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {endpoints.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(e.id)}
              className={`rounded-[6px] px-3 py-2 text-left text-sm transition-colors ${
                active === e.id
                  ? "border-l-2 border-[#FF6B35] bg-[#FF6B35]/10 pl-[10px] text-white/[0.92]"
                  : "border-l-2 border-transparent text-white/55 hover:bg-white/[0.04]"
              }`}
            >
              <span className="font-mono text-[11px] text-[#FF6B35]">{e.method}</span>{" "}
              <span className="block truncate text-xs text-white/70">{e.path}</span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="min-w-0 flex-1 space-y-4 p-4 lg:border-r lg:border-white/[0.08] lg:bg-mp-bg">
        <div className="lg:hidden">
          <label className="sr-only" htmlFor="ep-select">
            Endpoint
          </label>
          <select
            id="ep-select"
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="h-10 w-full rounded-[8px] border border-white/[0.08] bg-mp-surface px-2 font-mono text-xs"
          >
            {endpoints.map((e) => (
              <option key={e.id} value={e.id}>
                {e.method} {e.path}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="font-mono text-lg font-semibold text-white/[0.92]">{ep.title}</h2>
          <p className="mt-1 font-mono text-sm text-[#FF6B35]">
            {ep.method} {ep.path}
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/45">
            Authentication
          </h3>
          <pre className="mt-2 overflow-x-auto rounded-[8px] border border-white/[0.08] bg-mp-surface p-3 font-mono text-xs text-white/75">
            {`X-Api-Key: ${apiKey}`}
          </pre>
        </div>

        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/45">
            Query params (Zod)
          </h3>
          <div className="mt-2 overflow-x-auto rounded-[8px] border border-white/[0.08]">
            <table className="w-full min-w-[400px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-white/45">
                  <th className="px-3 py-2 font-mono">Param</th>
                  <th className="px-3 py-2 font-mono">Type</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/[0.06]">
                  <td className="px-3 py-2 font-mono">operator</td>
                  <td className="px-3 py-2 font-mono">enum | optional</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="px-3 py-2 font-mono">limit</td>
                  <td className="px-3 py-2 font-mono">number (1-500)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">cursor</td>
                  <td className="px-3 py-2 font-mono">string | optional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/45">
            Response (TypeScript)
          </h3>
          <pre className="mt-2 overflow-x-auto rounded-[8px] border border-white/[0.08] bg-mp-surface p-3 font-mono text-[11px] leading-relaxed text-[#2D9CDB]">
            {`interface ListResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    hasMore: boolean;
    nextCursor: string | null;
  };
}`}
          </pre>
        </div>
      </section>

      <aside className="rounded-[8px] border border-white/[0.08] bg-mp-surface p-4 lg:rounded-none lg:border-0">
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-white/55">Try it</h3>
        <label className="mt-3 block text-[10px] font-mono uppercase text-white/40">X-Api-Key</label>
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="mt-1 h-9 w-full rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] px-2 font-mono text-xs outline-none focus:border-[#FF6B35]/50"
        />
        <label className="mt-3 block text-[10px] font-mono uppercase text-white/40">Endpoint</label>
        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          className="mt-1 h-9 w-full rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] px-2 font-mono text-xs"
        >
          {endpoints.map((e) => (
            <option key={e.id} value={e.id}>
              {e.method} {e.path}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
          className="mt-4 flex h-10 w-full items-center justify-center rounded-[8px] bg-[#FF6B35] text-sm font-semibold text-black transition-colors hover:bg-[#E55A2A] disabled:opacity-60"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
          ) : (
            "Send request"
          )}
        </button>
        <pre className="mt-4 max-h-64 overflow-auto rounded-[8px] border border-white/[0.08] bg-[#0C0C0C] p-3 font-mono text-[11px] text-white/70">
          {response}
        </pre>
      </aside>
    </div>
  );
}
