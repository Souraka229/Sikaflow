import type { Metadata } from "next";
import { DevicesClient } from "@/components/momoparse/devices-client";
import { devicesMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Appareils",
};

export default function DevicesPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4 pb-10 md:pb-8">
      <div>
        <h1 className="text-xl font-bold text-mp-text">Appareils</h1>
        <p className="mt-1 text-sm font-medium text-mp-muted">
          Passerelles Android — secret unique, ping &amp; opérateurs par appareil.
        </p>
      </div>
      <DevicesClient initialDevices={devicesMock} />
    </div>
  );
}
