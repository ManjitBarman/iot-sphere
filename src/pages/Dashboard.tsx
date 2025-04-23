
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus, Save, LayoutGrid, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [autoFormat, setAutoFormat] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handleSaveDashboard = () => {
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard changes have been saved successfully.",
    });
    setEditMode(false);
  };

  useEffect(() => {
    // Apply auto-format settings to the layout
    if (autoFormat) {
      // This would apply auto-formatting logic in a real implementation
      console.log("Auto-formatting layout applied");
    }
  }, [autoFormat]);

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
              
              {editMode && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-format"
                      checked={autoFormat}
                      onCheckedChange={setAutoFormat}
                    />
                    <Label htmlFor="auto-format" className="cursor-pointer">Auto-Format Layout</Label>
                  </div>
                  <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
                    <Settings className="mr-2 h-4 w-4" /> Dashboard Settings
                  </Button>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> Add Widget
                  </Button>
                  <Button onClick={handleSaveDashboard}>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              )}
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
            
            <DashboardContent editMode={editMode} autoFormat={autoFormat} />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
