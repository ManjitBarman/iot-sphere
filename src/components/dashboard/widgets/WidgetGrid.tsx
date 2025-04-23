
import React from "react";

interface WidgetGridProps {
  children: React.ReactNode;
  editMode: boolean;
  autoFormat?: boolean;
}

export function WidgetGrid({ children, editMode, autoFormat = false }: WidgetGridProps) {
  return (
    <div 
      className={`grid ${
        autoFormat 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
      } ${editMode ? 'bg-muted/30 p-4 rounded-lg min-h-[70vh] transition-all duration-300' : ''}`}
    >
      {children}
    </div>
  );
}
