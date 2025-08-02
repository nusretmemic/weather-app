import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
  className?: string;
}

export function DeleteButton({ onDelete, className }: DeleteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onDelete}
      className={`text-white absolute top-2 right-2 hover:text-gray-900 hover:bg-white/50 transition-colors duration-200 ${className}`}
    >
      <Trash2 className="w-5 h-5" />
    </Button>
  );
}
