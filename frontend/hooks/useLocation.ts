import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface LocationSuggestion {
  id: string | number;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

/**
 * Custom hook to fetch location suggestions based on a search query.
 * @param query The search term for querying locations.
 * @returns A React Query result containing suggestions, loading status, and errors.
 */
export function useLocation(query: string) {
  return useQuery<LocationSuggestion[], Error>({
    queryKey: ["locations", query],
    queryFn: async () => {
      const { data } = await apiClient.get<LocationSuggestion[]>(
        `/locations/search?q=${encodeURIComponent(query)}`
      );
      return data;
    },
    enabled: query.trim().length > 0,
    staleTime: 60_000, // cache results for 1 minute
  });
}
