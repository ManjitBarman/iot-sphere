
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus, Save, LayoutGrid, Settings, Info, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { WidgetSelector } from "@/components/dashboard/widgets/WidgetSelector";
import { UserPermissionsDialog } from "@/components/dashboard/UserPermissionsDialog";
import { UserGuideDialog } from "@/components/dashboard/UserGuideDialog";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [showUserPermissions, setShowUserPermissions] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSaveDashboard = () => {
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard changes have been saved successfully.",
    });
    setEditMode(false);
  };

  // Check if this is the user's first visit to show the guide
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenDashboardGuide");
    if (!hasSeenGuide) {
      setShowUserGuide(true);
    }
  }, []);

  const handleCloseGuide = () => {
    localStorage.setItem("hasSeenDashboardGuide", "true");
    setShowUserGuide(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={editMode} setEditMode={setEditMode} />
            <div className="flex items-center justify-between gap-4 py-3 px-6 border-b bg-card">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${editMode ? "text-primary" : ""}`}>
                  {editMode ? "Edit Mode: Customize your dashboard" : "View Mode"}
                </span>
                <Button 
                  variant={editMode ? "secondary" : "default"} 
                  onClick={() => setEditMode(em => !em)}
                  className="transition-all duration-300"
                >
                  {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
                </Button>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowUserGuide(true)}
                >
                  <Info className="mr-2 h-4 w-4" /> User Guide
                </Button>
                
                {editMode && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-format"
                        checked={autoFormat}
                        onCheckedChange={setAutoFormat}
                      />
                      <Label htmlFor="auto-format" className="cursor-pointer">Auto-Format Layout</Label>
                    </div>
                    <Button variant="outline" onClick={() => setShowUserPermissions(true)}>
                      <Users className="mr-2 h-4 w-4" /> Manage Access
                    </Button>
                    <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
                      <Settings className="mr-2 h-4 w-4" /> Dashboard Settings
                    </Button>
                    <Button variant="outline" onClick={() => setShowWidgetSelector(true)}>
                      <Plus className="mr-2 h-4 w-4" /> Add Widget
                    </Button>
                    <Button onClick={handleSaveDashboard}>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {showSettings && editMode && (
              <div className="p-4 bg-muted/20 border-b">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-lg font-medium mb-3">Dashboard Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dashboard-name">Dashboard Name</Label>
                      <input
                        id="dashboard-name"
                        type="text"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue="Main Dashboard"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="layout-type">Layout Type</Label>
                      <select
                        id="layout-type"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue="grid"
                      >
                        <option value="grid">Grid</option>
                        <option value="masonry">Masonry</option>
                        <option value="list">List</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <select
                        id="theme"
                        className="w-full px-3 py-2 border rounded-md"
                        defaultValue="default"
                      >
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="colorful">Colorful</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DashboardContent 
              editMode={editMode} 
              autoFormat={autoFormat} 
            />
          </div>
        </div>
      </SidebarProvider>
      
      <WidgetSelector 
        isOpen={showWidgetSelector}
        onClose={() => setShowWidgetSelector(false)}
        onSelectWidget={(type, size) => {
          toast({
            title: "Widget Added",
            description: `New ${type} widget has been added to your dashboard`,
          });
          setShowWidgetSelector(false);
        }}
        devices={[
          { id: "dev-1", name: "Temperature Sensor" },
          { id: "dev-2", name: "Humidity Control" },
          { id: "dev-3", name: "Smart Light" },
        ]}
        selectedDevice={selectedDevice}
        onSelectDevice={setSelectedDevice}
      />
      
      <UserPermissionsDialog 
        open={showUserPermissions}
        onOpenChange={setShowUserPermissions}
      />
      
      <UserGuideDialog 
        open={showUserGuide}
        onOpenChange={handleCloseGuide}
      />
    </div>
  );
};

export default Dashboard;
