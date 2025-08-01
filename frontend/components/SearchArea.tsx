import { LocationSuggestion } from "@/hooks/useLocation";
import { useAddWidget } from "@/hooks/useWidgets";
import { SearchBar } from "./SearchBar";

export function SearchArea() {
  const { mutate: addWidget } = useAddWidget();

  const handleSelect = (loc: LocationSuggestion) => {
    addWidget({
      id: +loc.id, // Use the location ID as the widget ID
      location: loc.name + ", " + loc.country,
      lat: loc.lat,
      lng: loc.lng,
    });
  };
  return (
    <div className="max-w-3xl p-6 bg-[#ffffff80] rounded-lg mx-auto lg:h-[93vh] shadow-md z-10 relative flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-center">Weather Widgets</h1>
      <p className="text-center">
        Add your favorite locations to get the latest weather updates.
      </p>
      <SearchBar onSelect={handleSelect} />
    </div>
  );
}
