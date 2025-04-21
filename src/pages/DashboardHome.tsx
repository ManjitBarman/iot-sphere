
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HomeSteps from "@/components/dashboard/HomeSteps";
import QuickActions from "@/components/dashboard/QuickActions";
import GettingStartedGuide from "@/components/dashboard/GettingStartedGuide";
import { useState } from "react";

export default function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-muted/20">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <main className="flex-1 p-8 bg-muted/20">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 mt-2">Welcome to zsee IoT Platform</h1>
                <p className="text-muted-foreground mb-6">
                  Follow these steps to get started with your IoT solution
                </p>
                <HomeSteps />
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 min-w-0">
                    <QuickActions />
                  </div>
                  <div className="flex-1 min-w-0">
                    <GettingStartedGuide />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
