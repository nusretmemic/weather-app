"use client";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useLocation, LocationSuggestion } from "@/hooks/useLocation";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSelect: (loc: LocationSuggestion) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce inputValue -> query
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(inputValue.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data: suggestions = [], isLoading } = useLocation(query);

  // Open dropdown when suggestions available
  useEffect(() => {
    if (suggestions.length > 0 && inputValue) {
      setOpen(true);
    }
  }, [suggestions]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <Input
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full placeholder:text-gray-600 bg-white/80 text-gray-900 focus:ring-2 focus:ring-blue-500 transition-colors duration-200 pl-10 border-gray-300 border-2 focus:border-blue-500 focus:border-0"
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && (
        <div className="absolute mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-auto z-20">
          {isLoading ? (
            <div className="p-4 text-gray-500">Loading...</div>
          ) : !inputValue ? (
            <div className="p-4 text-gray-500">Start typing to search...</div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-gray-500">No results found.</div>
          ) : (
            suggestions.map((s) => (
              <div
                key={`${s.lat}-${s.lng}-${s.name}`}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                onClick={() => {
                  onSelect(s);
                  setInputValue("");
                  setQuery("");
                  setOpen(false);
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
