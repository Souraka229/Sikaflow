import type { Metadata } from "next";
import { DocsHero } from "@/components/momoparse/docs-hero";
import { DocsPlayground } from "@/components/momoparse/docs-playground";

export const metadata: Metadata = {
  title: "Documentation API",
  description: "Référence REST v1, exemples et playground Sika FLOW.",
};

export default function DocsPage() {
  const demoKey = process.env.SIKAFLOW_DOCS_DEMO_KEY?.trim() ?? "";

  return (
    <div className="mx-auto max-w-[1920px] space-y-8 pb-10 md:pb-8">
      <DocsHero />
      <DocsPlayground defaultApiKey={demoKey} />
    </div>
  );
}
