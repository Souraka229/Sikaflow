import { ApiKeysClient } from "@/components/momoparse/api-keys-client";
import { apiKeysMock } from "@/lib/mock-data";

export default function ApiKeysPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-white/[0.92]">API Keys</h1>
        <p className="mt-1 text-sm text-white/55">
          Clés hashées côté serveur — affichage unique à la création.
        </p>
      </div>
      <ApiKeysClient initialKeys={apiKeysMock} />
    </div>
  );
}
