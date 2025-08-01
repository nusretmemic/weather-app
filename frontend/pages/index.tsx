import { useState, useEffect } from "react";
import axios from "axios";

interface LocationSuggestion {
  id: string; // Unique identifier for the location
  name: string;
  country: string;
  lat: number;
  lng: number;
}

interface Widget {
  _id: string;
  location: string;
  lat: number;
  lng: number;
  createdAt: string;
  weather: {
    temperature: number;
    windSpeed: number;
    description: string;
    updatedAt: Date;
  };
}

export default function Home() {
  // existing state
  const [widgets, setWidgets] = useState<Widget[]>([]);
  // new state for search
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchWidgets();
  }, []);

  // 1) Fetch suggestions when `query` changes
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const { data } = await axios.get<LocationSuggestion[]>(
          `http://localhost:5000/locations/search?q=${encodeURIComponent(
            query
          )}`
        );
        setSuggestions(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Location search failed", err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [query]);

  const fetchWidgets = async () => {
    try {
      const { data } = await axios.get<Widget[]>(
        "http://localhost:5000/widgets"
      );
      setWidgets(data);
    } catch (err) {
      console.error("Failed to fetch widgets", err);
    }
  };

  const handleSelect = async (loc: LocationSuggestion) => {
    setShowDropdown(false);
    setQuery("");

    // create widget with lat/lng and display name
    await axios.post("http://localhost:5000/widgets", {
      id: loc.id,
      location: `${loc.name}, ${loc.country}`,
      lat: loc.lat,
      lng: loc.lng,
    });
    fetchWidgets();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/widgets/${id}`);
    setWidgets((prev) => prev.filter((w) => w._id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* --- City Search --- */}
      <div className="relative mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full p-2 border rounded"
          onFocus={() => query && setShowDropdown(true)}
        />
        {showDropdown && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {s.name}, {s.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul>
        {widgets.map((w) => (
          <li
            key={w._id}
            className="flex justify-between items-center mb-4 p-4 border rounded"
          >
            <div>
              <div className="font-semibold">{w.location}</div>
              <div>
                {w.weather.temperature}°C, {w.weather.description} (
                {w.weather.windSpeed} m/s)
                <br />
                <small>
                  Last updated:{" "}
                  {new Date(w.weather.updatedAt).toLocaleDateString("de-DE")}{" "}
                  {new Date(w.weather.updatedAt).toLocaleTimeString("de-DE")}
                </small>
              </div>
            </div>
            <button
              onClick={() => handleDelete(w._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
