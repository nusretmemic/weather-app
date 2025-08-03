import Image from "next/image";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={"/skyBg.jpg"}
        alt="Weather App Background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
