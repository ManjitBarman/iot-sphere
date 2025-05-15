
import { Button } from "@/components/ui/button";
import { ArrowRight, Server, Plus, Database, LayoutDashboard, Save, Gauge } from "lucide-react";

export interface TourCardProps {
  step: number;
  total: number;
  title: string;
  content: string;
  image: string;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

// Individual tour card component
const TourCard = ({ step, total, title, content, image, onNext, onBack, onSkip, onFinish }: TourCardProps) => {
  return (
    <div className="max-w-md w-full">
      <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 mb-5 h-40 flex items-center justify-center">
        {/* We'd use actual images in production, but for now using a placeholder */}
        <div className="text-primary/40 text-6xl">
          {step === 0 && <Server className="w-16 h-16" />}
          {step === 1 && <Server className="w-16 h-16" />}
          {step === 2 && <Plus className="w-16 h-16" />}
          {step === 3 && <Server className="w-16 h-16" />}
          {step === 4 && <Database className="w-16 h-16" />}
          {step === 5 && <LayoutDashboard className="w-16 h-16" />}
          {step === 6 && <Save className="w-16 h-16" />}
          {step === 7 && <Gauge className="w-16 h-16" />}
          {step === 8 && <LayoutDashboard className="w-16 h-16" />}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {step > 0 && (
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
          )}
          
          {step < total - 1 ? (
            <Button onClick={onNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onFinish}>
              Finish
            </Button>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {step + 1} / {total}
        </div>
      </div>
      
      {step < total - 1 && (
        <Button variant="link" className="mt-4 text-muted-foreground" onClick={onSkip}>
          Skip tour
        </Button>
      )}
    </div>
  );
};

export default TourCard;
