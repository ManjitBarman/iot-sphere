
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useTheme } from "@/hooks/useTheme";

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
            <DashboardContent editMode={editMode} />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
