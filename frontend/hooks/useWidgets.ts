import apiClient from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface WidgetData {
  id: number;
  location: string;
  weather: {
    temperature: number;
    temperatureMin: number;
    temperatureMax: number;
    windSpeed: number;
    weatherCode: number;
    humidity: number;
    updatedAt: Date;
  };
}

export interface LocationData {
  id: number;
  location: string;
  lat: number;
  lng: number;
}

export async function fetchWidgets(): Promise<WidgetData[]> {
  const { data } = await apiClient.get<WidgetData[]>("/widgets");
  return data;
}

export function useWidgets() {
  return useQuery<WidgetData[], Error>({
    queryKey: ["widgets"],
    queryFn: fetchWidgets,
    refetchInterval: 60000, // Refetch every minute
  });
}

export function useAddWidget() {
  const queryClient = useQueryClient();

  return useMutation<WidgetData, AxiosError, LocationData>({
    mutationFn: (widget) =>
      apiClient.post<WidgetData>("/widgets", widget).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
      toast.success("Your widget was added!");
    },
    onError: (error: any) => {
      console.error(error.response);
      // Check for duplicate widget error Status 409
      if (error.response.status === 409) {
        toast.error("That widget already exists.");
      } else {
        toast.error(error.message || "Failed to add widget.");
      }
    },
  });
}

export function useDeleteWidget() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: (id) => apiClient.delete(`/widgets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] });
      toast.success(`Widget removed.`, { icon: "🗑️" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete widget.");
    },
  });
}
