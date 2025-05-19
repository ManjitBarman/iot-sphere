
import { Moon, Sun, Plus, Maximize2, Minimize2, ToggleLeft, ToggleRight, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import ProfileMenu from "@/components/ProfileMenu";
import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

const DashboardHeader = ({ editMode, setEditMode }: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [isSimulating, setIsSimulating] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { toast } = useToast();

  const toggleSimulation = () => {
    const newState = !isSimulating;
    setIsSimulating(newState);
    
    toast({
      title: newState ? "Simulation Mode Enabled" : "Simulation Mode Disabled",
      description: newState 
        ? "You're now seeing simulated data. Real device data is paused." 
        : "Returning to live device data.",
    });
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  const handleUndo = () => {
    toast({
      title: "Undo",
      description: "Previous action undone.",
    });
  };

  const handleRedo = () => {
    toast({
      title: "Redo",
      description: "Action re-applied.",
    });
  };

  return (
    <div className="border-b">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">zsee IoT Dashboard</h1>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-3">
          {/* Simulation toggle with indicator */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`gap-1 ${isSimulating ? 'border-primary bg-primary/10 text-primary' : ''}`}
                  onClick={toggleSimulation}
                >
                  {isSimulating ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      <span className="hidden sm:inline">Simulation: On</span>
                      <span className="inline sm:hidden">Sim</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Simulation: Off</span>
                      <span className="inline sm:hidden">Sim</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isSimulating ? "Disable simulation mode" : "Enable simulation mode"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Undo/Redo buttons */}
          <div className="hidden sm:flex items-center gap-1 border rounded-md bg-background">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none" onClick={handleUndo}>
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="h-6 w-px bg-border"></div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={handleRedo}>
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Fullscreen button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleFullScreen}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant={editMode ? "default" : "outline"}
            onClick={() => setEditMode(!editMode)}
            className="transition-colors"
          >
            {editMode ? "Done" : "Edit"}
          </Button>
          {editMode && (
            <Button variant="outline" className="gap-1">
              <Plus className="h-4 w-4" /> Add Widget
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <ProfileMenu />
        </div>
      </div>
      
      {/* Simulation banner */}
      {isSimulating && (
        <div className="bg-primary/10 border-t border-b border-primary/20 py-1 px-4 text-center text-sm text-primary font-medium animate-fade-in">
          Simulation Mode Active — You are viewing simulated data
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
