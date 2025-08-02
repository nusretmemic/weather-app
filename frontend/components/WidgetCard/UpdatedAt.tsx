import React from "react";
import { format } from "date-fns";

interface UpdatedAtProps {
  timestamp: string | Date;
}

export function UpdatedAt({ timestamp }: UpdatedAtProps) {
  return (
    <div className="flex items-center absolute bottom-4 right-4 text-xs italic text-white">
      <span className="mr-2">🕒</span>
      <span>Updated: {format(new Date(timestamp), "PPp")}</span>
    </div>
  );
}
