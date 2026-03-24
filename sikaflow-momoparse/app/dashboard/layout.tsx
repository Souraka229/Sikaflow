import type { Metadata } from "next";
import { DashboardShell } from "@/components/momoparse/dashboard-shell";

export const metadata: Metadata = {
  description: "Espace Sika FLOW — analytics Mobile Money, API et appareils.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
