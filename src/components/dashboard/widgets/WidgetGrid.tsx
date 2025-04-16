
import React from "react";

interface WidgetGridProps {
  children: React.ReactNode;
  editMode: boolean;
}

export function WidgetGrid({ children, editMode }: WidgetGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${editMode ? 'bg-muted/30' : ''}`}>
      {children}
    </div>
  );
}
