import type { Metadata } from "next";
import { ApiKeysClient } from "@/components/momoparse/api-keys-client";
import { apiKeysMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Clés API",
};

export default function ApiKeysPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4 pb-10 md:pb-8">
      <div>
        <h1 className="text-xl font-bold text-mp-text">Clés API</h1>
        <p className="mt-1 text-sm font-medium text-mp-muted">
          Clés hashées côté serveur — affichage unique à la création.
        </p>
      </div>
      <ApiKeysClient initialKeys={apiKeysMock} />
    </div>
  );
}
