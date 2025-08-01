"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useLocation, LocationSuggestion } from "@/hooks/useLocation";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface SearchBarProps {
  onSelect: (loc: LocationSuggestion) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce the input for querying
  const query = useDebounce(input.trim(), 300);
  const isTyping = input !== query;

  // Fetch suggestions
  const { data: suggestions = [], isLoading } = useLocation(query);

  // Close dropdown on outside click
  useOnClickOutside(containerRef, () => setOpen(false));

  // Open dropdown when focus or new suggestions
  useEffect(() => {
    if (query || input.length) setOpen(true);
  }, [query, input]);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full pl-10 bg-white/80 text-gray-900 border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto z-20">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : isTyping ? (
            <div className="p-4 text-gray-500">Typing...</div>
          ) : !query ? (
            <div className="p-4 text-gray-500">Start typing to search...</div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-gray-500">No results found.</div>
          ) : (
            suggestions.map((s) => (
              <div
                key={`${s.lat}-${s.lng}-${s.name}`}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 border-gray-200"
                onClick={() => {
                  onSelect(s);
                  setOpen(false);
                  setInput("");
                }}
              >
                {s.name}, {s.country}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
