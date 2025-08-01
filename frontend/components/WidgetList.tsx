"use client";
import { useWidgets } from "@/hooks/useWidgets";
import { WidgetCard } from "./WidgetCard";

interface WidgetListProps {
  onDelete: (id: number) => void;
}

export function WidgetList({ onDelete }: WidgetListProps) {
  const { data: widgets } = useWidgets();

  return (
    <div className="my-10 flex flex-wrap container mx-auto gap-8 px-8">
      {widgets?.length === 0 && (
        <div className="text-center text-gray-800 w-[500px] m-auto bg-white/80 p-6 rounded-lg shadow-md">
          No widgets added yet. Start by searching for a location.
        </div>
      )}
      {widgets?.map((w) => (
        <WidgetCard key={w.id} widget={w} onDelete={onDelete} />
      ))}
    </div>
  );
}
