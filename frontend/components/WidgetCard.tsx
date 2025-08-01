"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WidgetData } from "@/hooks/useWidgets";
import { ThermometerSun, Trash2, Wind } from "lucide-react";
import ClodyImage from "@/images/cloudy-animated.png";
import SunImage from "@/images/sun.png";

import { format } from "date-fns";
import Image from "next/image";

interface WidgetCardProps {
  widget: WidgetData;
  onDelete: (id: number) => void;
}

export function WidgetCard({ widget, onDelete }: WidgetCardProps) {
  return (
    <Card className="relative border-white overflow-hidden rounded-3xl bg-[#00000060] shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 pb-0 w-[300px] h-[440px]">
      {/* Main content */}
      <CardContent className="mt-6 p-6 shadow-lg h-full">
        <Button
          variant={"ghost"}
          size="icon"
          onClick={() => onDelete(widget.id)}
          className="text-white text-lg absolute top-2 right-2 hover:text-gray-900  cursor-pointer hover:bg-white/50 transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
        <div className="flex items-center justify-between">
          <Image
            src={SunImage.src}
            alt={"Weather Icon"}
            className="mr-auto"
            width={72}
            height={72}
          />
          <ThermometerSun className="mr-2 text-yellow-500" size={25} />
          <span className="text-white text-5xl">
            {Math.round(widget.weather.temperature)}°C
          </span>
        </div>
        <div className="flex justify-between items-start my-8">
          <h3 className="text-2xl font-bold text-white text-shadow-lg">
            {widget.location}
          </h3>
        </div>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <Wind className="mr-2 text-blue-500" size={40} />
            <span className="font-bold text-white text-2xl">
              {widget.weather.windSpeed} m/s
            </span>
          </div>
        </div>
        <div className="flex items-center absolute bottom-4 right-4">
          <span className="mr-2 text-gray-500">🕒</span>
          <span className="text-sm text-white">
            Updated: {format(new Date(widget.weather.updatedAt), "PPp")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
