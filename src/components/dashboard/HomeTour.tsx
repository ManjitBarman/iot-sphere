import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  Plus, 
  Server, 
  Database, 
  LayoutDashboard, 
  Save, 
  Gauge
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tour steps with their content and navigation targets
const tourSteps = [
  {
    title: "Welcome to zsee IoT Platform",
    content: "Let's take a quick tour to help you get started with our IoT platform. We'll guide you through the essential setup process, from device registration to real-time monitoring.",
    image: "onboarding-welcome.svg",
    target: null
  },
  {
    title: "Step 1: Navigate to Devices",
    content: "First, go to the Devices section where you'll manage your IoT hardware. This is where you'll start the device registration process.",
    image: "onboarding-devices.svg",
    target: "/devices"
  },
  {
    title: "Step 2: Add a New Device",
    content: "Click the 'Add Device' button to register your IoT hardware. This will open a form for entering your device details.",
    image: "onboarding-add-device.svg",
    target: "/devices"
  },
  {
    title: "Step 3: Select Connectivity Type",
    content: "Choose your device's connectivity method (MQTT or HTTP) and enter the required device details in the popup form.",
    image: "onboarding-connectivity.svg",
    target: null
  },
  {
    title: "Step 4: Configure Topics",
    content: "After creating your device, you'll need to configure MQTT topics within the device settings. These topics define the data channels between your device and the platform.",
    image: "onboarding-topics.svg",
    target: null
  },
  {
    title: "Step 5: Create Dashboard",
    content: "Next, create a dashboard to visualize and monitor your device data. If one doesn't exist already, the system will help you create one.",
    image: "onboarding-dashboard.svg",
    target: "/dashboards"
  },
  {
    title: "Step 6: Setup Simulation",
    content: "If you have hardware JSON data available, paste it into the simulation section to test your setup before connecting actual hardware.",
    image: "onboarding-simulation.svg",
    target: null
  },
  {
    title: "Step 7: Add Widgets",
    content: "In dashboard edit mode, click 'Add Widget' to visualize different aspects of your device data. You can choose from various widget types and customize their appearance.",
    image: "onboarding-widgets.svg",
    target: null
  },
  {
    title: "All Set!",
    content: "Congratulations! Your IoT monitoring system is now ready. You can monitor your devices in real-time through your customized dashboard.",
    image: "onboarding-complete.svg",
    target: null
  }
];

interface TourCardProps {
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

// Mini tour card component for the dashboard
export const MiniTourCard = ({ onStartTour }: { onStartTour: () => void }) => {
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

// Main tour component that handles the tour state
const HomeTour = () => {
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
    </>
  );
};

export default HomeTour;
