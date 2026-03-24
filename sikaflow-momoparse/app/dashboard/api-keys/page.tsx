import type { Metadata } from "next";
import { ApiKeysClient } from "@/components/momoparse/api-keys-client";
import { getApiKeys } from "@/lib/data/api-keys";

export const metadata: Metadata = {
  title: "Cles API",
};

export default async function ApiKeysPage() {
  const apiKeys = await getApiKeys();

  return (
    <div className="mx-auto max-w-[1920px] space-y-4 pb-10 md:pb-8">
      <div>
        <h1 className="text-xl font-bold text-mp-text">Cles API</h1>
        <p className="mt-1 text-sm font-medium text-mp-muted">
          Cles hashees cote serveur — affichage unique a la creation.
        </p>
      </div>
      <ApiKeysClient initialKeys={apiKeys} />
    </div>
  );
}
