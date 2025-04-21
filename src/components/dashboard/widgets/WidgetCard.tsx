
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cpu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  device?: string;
  editMode?: boolean;
  onDelete?: () => void;
}

export function WidgetCard({ 
  title, 
  children, 
  className, 
  size = "md", 
  device,
  editMode = false,
  onDelete
}: WidgetCardProps) {
  const sizeClasses = {
    sm: "md:col-span-1",
    md: "md:col-span-2",
    lg: "md:col-span-3",
    xl: "md:col-span-4",
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all relative", 
      sizeClasses[size], 
      editMode ? "border-dashed border-2 border-primary/50" : "",
      className
    )}>
      <CardHeader className="p-4 bg-card flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-md font-medium">{title}</CardTitle>
          {device && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Cpu className="h-3 w-3 mr-1" />
              {device}
            </div>
          )}
        </div>
        {editMode && onDelete && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-destructive/20 hover:text-destructive"
            onClick={onDelete}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
      
      {editMode && (
        <div className="absolute inset-0 bg-transparent group cursor-move flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded text-sm transition-opacity">
            Drag to reposition
          </div>
        </div>
      )}
    </Card>
  );
}
