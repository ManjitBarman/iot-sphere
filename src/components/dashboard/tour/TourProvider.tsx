import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TourCard from "./TourCard";
import { tourSteps } from "./tourData";

interface TourProviderProps {
  children?: React.ReactNode;
}

const TourProvider = ({ children }: TourProviderProps) => {
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user has seen the tour before
    const tourSeen = localStorage.getItem('zsee-tour-seen');
    setHasSeenTour(tourSeen === 'true');
  }, []);
  
  const handleStartTour = () => {
    setCurrentStep(0);
    setShowTour(true);
  };
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // If this step has a navigation target, ask if they want to go there
      if (tourSteps[nextStep].target) {
        // We'll keep the tour open but offer navigation
        toast({
          title: "Would you like to navigate?",
          description: `Go to ${tourSteps[nextStep].target} to see this in action.`,
          action: (
            <Button variant="outline" size="sm" onClick={() => {
              navigate(tourSteps[nextStep].target as string);
              setShowTour(false);
            }}>
              Go now
            </Button>
          ),
        });
      }
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSkip = () => {
    setShowTour(false);
    localStorage.setItem('zsee-tour-seen', 'true');
    setHasSeenTour(true);
  };
  
  const handleFinish = () => {
    setShowTour(false);
    localStorage.setItem('zsee-tour-seen', 'true');
    setHasSeenTour(true);
    toast({
      title: "Tour completed!",
      description: "You can restart the tour anytime from your home page."
    });
  };

  return (
    <>
      {!hasSeenTour && (
        <div className="fixed bottom-5 right-5 z-50 bg-card shadow-lg rounded-lg p-4 border border-border animate-fade-in">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">New to zsee IoT Platform?</p>
              <p className="text-sm text-muted-foreground">Let us show you around!</p>
            </div>
            <Button size="sm" onClick={handleStartTour}>
              Start Tour
            </Button>
          </div>
        </div>
      )}
      
      <Dialog open={showTour} onOpenChange={setShowTour}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Platform Tour</DialogTitle>
          </DialogHeader>
          
          <TourCard 
            step={currentStep}
            total={tourSteps.length}
            title={tourSteps[currentStep].title}
            content={tourSteps[currentStep].content}
            image={tourSteps[currentStep].image}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            onFinish={handleFinish}
          />
        </DialogContent>
      </Dialog>

      {children}
      
      {/* Hidden button that will be clicked programmatically */}
      <button
        id="start-tour-button"
        className="hidden"
        aria-hidden="true"
        onClick={handleStartTour}
      />
    </>
  );
};

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LayoutDashboard } from "lucide-react";

export default TourProvider;
