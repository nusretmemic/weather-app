import React from "react";
import { Wind, Droplets } from "lucide-react";

interface StatsProps {
  windSpeed: number;
  humidity: number;
}

export function Stats({ windSpeed, humidity }: StatsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Wind className="mr-2 text-orange-300" size={24} />
        <span className="text-white text-xl font-bold">{windSpeed} m/s</span>
      </div>
      <div className="flex items-center">
        <Droplets className="mr-2 text-blue-200" size={24} />
        <span className="text-white text-xl font-bold">{humidity} %</span>
      </div>
    </div>
  );
}
