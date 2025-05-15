
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

interface MiniTourCardProps {
  onStartTour: () => void;
}

// Mini tour card component for the dashboard
const MiniTourCard = ({ onStartTour }: MiniTourCardProps) => {
  return (
    <Card className="border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
      <CardContent className="p-6 flex flex-col items-center text-center" onClick={onStartTour}>
        <div className="rounded-full bg-primary/20 p-3 mb-4">
          <LayoutDashboard className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-1">New here?</h3>
        <p className="text-sm text-muted-foreground">Take a quick tour to get started</p>
      </CardContent>
    </Card>
  );
};

export default MiniTourCard;
