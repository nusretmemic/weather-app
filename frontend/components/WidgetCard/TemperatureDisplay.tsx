import { ThermometerSun } from "lucide-react";
import React from "react";

interface TemperatureDisplayProps {
  temperature: number;
  min?: number;
  max?: number;
}

export function TemperatureDisplay({
  temperature,
  min,
  max,
}: TemperatureDisplayProps) {
  return (
    <div className="flex items-center">
      <span className="text-white text-5xl font-medium">
        {Math.round(temperature)}°
      </span>
      {(min !== undefined || max !== undefined) && (
        <div className="flex flex-col ml-2 text-white text-sm">
          {min !== undefined && (
            <div className="flex items-center justify-center mb-">
              <ThermometerSun className="text-orange-300 mr-1" size={12} />
              <span>L: {Math.round(min)}°</span>
            </div>
          )}
          <div className="h-px bg-white my-1" />
          {max !== undefined && (
            <div className="flex items-center justify-center">
              <ThermometerSun className="text-orange-300 mr-1" size={12} />
              <span>H: {Math.round(max)}°</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
