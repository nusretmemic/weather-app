import { LocationSuggestion } from "@/hooks/useLocation";
import { useState } from "react";
import { Badge } from "@/components/common/badge";

interface SearchResultItemProps {
  s: LocationSuggestion;
  onClick: () => void;
}

export function SearchResultItem({ s, onClick }: SearchResultItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      key={`${s.lat}-${s.lng}-${s.name}`}
      className="px-4 py-3 flex justify-between hover:bg-gray-100 cursor-pointer border-b last:border-b-0 border-gray-200 transition"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {s.name}, {s.country}
      {isHovered && <Badge variant={"outline"}>Click to add</Badge>}
    </div>
  );
}
