import Image from "next/image";
import { getWeatherImage } from "@/utils/getWeatherImage";

interface WeatherIconProps {
  code: number;
  size?: number;
}

export function WeatherIcon({ code, size = 55 }: WeatherIconProps) {
  const src = getWeatherImage(code);
  return <Image src={src} alt="Weather Icon" width={size} height={size} />;
}
