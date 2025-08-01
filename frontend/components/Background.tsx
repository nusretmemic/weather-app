import Image from "next/image";
import SkyBg from "@/images/sky2.jpg";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={SkyBg}
        alt="Weather App Background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
