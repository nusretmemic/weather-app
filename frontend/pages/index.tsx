import { useAddWidget, useDeleteWidget } from "@/hooks/useWidgets";
import { SearchBar } from "@/components/SearchBar";
import { WidgetList } from "@/components/WidgetList";
import { LocationSuggestion } from "@/hooks/useLocation";
import Image from "next/image";
import SkyBg from "@/images/sky2.jpg";

export default function Home() {
  const { mutate: addWidget } = useAddWidget();
  const { mutate: deleteWidget } = useDeleteWidget();

  function handleSelect(loc: LocationSuggestion) {
    addWidget({
      id: +loc.id, // Use the location ID as the widget ID
      location: loc.name + ", " + loc.country,
      lat: loc.lat,
      lng: loc.lng,
    });
  }

  return (
    <div className="relative min-h-screen flex justify-center">
      <div className="fixed inset-0 -z-10">
        <Image
          src={SkyBg}
          alt="Weather App Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="h-10" />
      <div className="max-w-3xl p-6 bg-[#ffffff80] rounded-lg m-4 mt-10 h-[93vh] shadow-md z-10 relative flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-center">Weather Widgets</h1>
        <p className="text-center">
          Add your favorite locations to get the latest weather updates.
        </p>
        <SearchBar onSelect={handleSelect} />
      </div>
      <WidgetList onDelete={deleteWidget} />
      <div className="h-20" />
    </div>
  );
}
