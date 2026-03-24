import { DocsClient } from "@/components/momoparse/docs-client";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-white/[0.92]">API documentation</h1>
        <p className="mt-1 text-sm text-white/55">
          Référence publique — authentification <span className="font-mono text-white/70">X-Api-Key</span>.
        </p>
      </div>
      <DocsClient />
    </div>
  );
}
