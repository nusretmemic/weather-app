"use client";
import { useDeleteWidget, useWidgets } from "@/hooks/useWidgets";
import { WidgetCard } from "./WidgetCard";

export function WidgetList() {
  const { data: widgets } = useWidgets();
  const { mutate: deleteWidget } = useDeleteWidget();

  const onDelete = (id: number) => {
    deleteWidget(id);
  };

  return (
    <div className="flex flex-wrap container lg:justify-start justify-center mx-auto gap-8 px-8">
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
