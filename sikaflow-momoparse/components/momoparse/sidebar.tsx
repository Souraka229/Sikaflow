"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: IconGrid },
  { href: "/dashboard/transactions", label: "Transactions", icon: IconList },
  { href: "/dashboard/api-keys", label: "API Keys", icon: IconKey },
  { href: "/dashboard/devices", label: "Devices", icon: IconPhone },
  { href: "/dashboard/docs", label: "Docs", icon: IconBook },
];

function IconGrid(props: { className?: string }) {
  return (
    <svg className={props.className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function IconList(props: { className?: string }) {
  return (
    <svg className={props.className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function IconKey(props: { className?: string }) {
  return (
    <svg className={props.className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}
function IconPhone(props: { className?: string }) {
  return (
    <svg className={props.className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
function IconBook(props: { className?: string }) {
  return (
    <svg className={props.className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
function IconChevron(props: { className?: string; flipped?: boolean }) {
  return (
    <svg
      className={`${props.className ?? ""} ${props.flipped ? "rotate-180" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden shrink-0 border-r border-white/[0.08] bg-mp-bg md:flex md:flex-col ${collapsed ? "w-[64px]" : "w-[240px]"}`}
    >
      <div className="flex h-14 items-center justify-between border-b border-white/[0.08] px-3">
        {!collapsed && (
          <span className="truncate pl-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
            SikaFlow
          </span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-[6px] p-1.5 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          aria-label={collapsed ? "Étendre la barre" : "Réduire la barre"}
        >
          <IconChevron flipped={!collapsed} />
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-[6px] px-3 py-2.5 text-sm transition-colors duration-150 ${
                active
                  ? "border-l-2 border-[#FF6B35] bg-[#FF6B35]/10 pl-[10px] text-white/[0.92]"
                  : "border-l-2 border-transparent text-white/55 hover:bg-white/[0.04] hover:text-white/80"
              } ${collapsed ? "justify-center px-2" : ""}`}
            >
              <Icon className={active ? "text-[#FF6B35]" : "text-white/45"} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
