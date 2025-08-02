"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { WidgetData } from "@/hooks/useWidgets";

import { DeleteButton } from "./DeleteButton";
import { WeatherIcon } from "./WeatherIcon";
import { TemperatureDisplay } from "./TemperatureDisplay";
import { Stats } from "./Stats";
import { UpdatedAt } from "./UpdatedAt";

interface WidgetCardProps {
  widget: WidgetData;
  onDelete: (id: number) => void;
}

export function WidgetCard({ widget, onDelete }: WidgetCardProps) {
  return (
    <Card className="relative border-white overflow-hidden rounded-3xl bg-[#00000060] shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 pb-0 w-[300px] h-[440px]">
      <CardContent className="mt-6 p-6 shadow-lg h-full">
        <DeleteButton onDelete={() => onDelete(widget.id)} />
        <div className="flex justify-between items-center mb-6">
          <WeatherIcon code={widget.weather.weatherCode} size={64} />
          <TemperatureDisplay
            temperature={widget.weather.temperature}
            min={widget.weather.temperatureMin}
            max={widget.weather.temperatureMax}
          />
        </div>
        <h3 className="text-2xl font-bold text-white text-shadow-lg my-8 h-16">
          {widget.location}
        </h3>
        <Stats
          windSpeed={widget.weather.windSpeed}
          humidity={widget.weather.humidity}
        />
        <UpdatedAt timestamp={widget.weather.updatedAt} />
      </CardContent>
    </Card>
  );
}
