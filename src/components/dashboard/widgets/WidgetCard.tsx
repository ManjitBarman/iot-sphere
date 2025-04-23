
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Cpu, X, GripVertical, Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  device?: string;
  editMode?: boolean;
  onDelete?: () => void;
  onRefresh?: () => void;
  onSettings?: () => void;
}

export function WidgetCard({ 
  title, 
  children, 
  className, 
  size = "md", 
  device,
  editMode = false,
  onDelete,
  onRefresh,
  onSettings
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
      editMode ? "border-dashed border-2 border-primary/50 shadow-sm" : "shadow-md hover:shadow-lg transition-shadow",
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
        <div className="flex items-center gap-1">
          {!editMode && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Refresh Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onSettings}>
                  <Settings className="h-4 w-4 mr-2" /> Widget Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                  <X className="h-4 w-4 mr-2" /> Remove Widget
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {editMode && onDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-destructive/20 hover:text-destructive"
              onClick={onDelete}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
      
      {editMode && (
        <>
          <div className="absolute inset-0 bg-transparent group cursor-move flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded text-sm transition-opacity flex items-center">
              <GripVertical className="h-4 w-4 mr-2" /> Drag to move
            </div>
          </div>
          <div className="absolute top-0 left-0 m-1 bg-primary/80 text-white text-xs px-2 py-1 rounded">
            {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"} Widget
          </div>
        </>
      )}
    </Card>
  );
}
