import { BottomNav } from "@/components/momoparse/bottom-nav";
import { DashboardHeader } from "@/components/momoparse/dashboard-header";
import { DashboardSidebar } from "@/components/momoparse/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-mp-bg">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col pb-24 md:pb-0">
        <DashboardHeader plan="PRO" />
        <main className="flex-1 overflow-auto scroll-pb-6 p-4 md:p-6">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
