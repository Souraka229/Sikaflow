import { DevicesClient } from "@/components/momoparse/devices-client";
import { devicesMock } from "@/lib/mock-data";

export default function DevicesPage() {
  return (
    <div className="mx-auto max-w-[1920px] space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-white/[0.92]">Devices</h1>
        <p className="mt-1 text-sm text-white/55">
          Passerelles Android — secret unique, ping &amp; opérateurs par appareil.
        </p>
      </div>
      <DevicesClient initialDevices={devicesMock} />
    </div>
  );
}
