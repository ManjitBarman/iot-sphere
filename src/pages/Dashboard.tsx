
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={editMode} setEditMode={setEditMode} />
            <div className="flex items-center gap-4 py-3 px-6 border-b bg-card">
              <span className="font-semibold">{editMode ? "Edit Mode: Drag widgets or add more" : "View Mode"}</span>
              <Button variant={editMode ? "secondary" : "default"} onClick={() => setEditMode(em => !em)}>
                {editMode ? "Disable Edit Mode" : "Enable Edit Mode"}
              </Button>
              {editMode && (
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Add Widget
                </Button>
              )}
            </div>
            <DashboardContent editMode={editMode} />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
