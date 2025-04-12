
import { cn } from "@/lib/utils";

interface ValueWidgetProps {
  value: number | string;
  label?: string;
  unit?: string;
  color?: string;
  large?: boolean;
}

export function ValueWidget({ 
  value, 
  label = "", 
  unit = "", 
  color = "#0070f3",
  large = false
}: ValueWidgetProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div 
        className={cn(
          "font-bold text-center",
          large ? "text-5xl" : "text-3xl"
        )}
        style={{ color }}
      >
        {value}{unit}
      </div>
      {label && (
        <div className="text-muted-foreground mt-2 text-center">
          {label}
        </div>
      )}
    </div>
  );
}
