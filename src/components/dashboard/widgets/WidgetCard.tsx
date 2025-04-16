
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function WidgetCard({ title, children, className, size = "md" }: WidgetCardProps) {
  const sizeClasses = {
    sm: "md:col-span-1",
    md: "md:col-span-2",
    lg: "md:col-span-3",
    xl: "md:col-span-4",
  };

  return (
    <Card className={cn("overflow-hidden transition-all", sizeClasses[size], className)}>
      <CardHeader className="p-4 bg-card">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  );
}
