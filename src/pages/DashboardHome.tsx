
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <div className="flex-1 p-8 bg-muted/20 flex flex-col items-center justify-center">
              <div className="max-w-lg w-full mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-4 text-base">
                      <li>
                        <span className="font-semibold">Create Devices:</span> Register your IoT devices to start managing them.<br/>
                        <Button size="sm" className="mt-2" onClick={() => navigate("/devices")}>
                          <Plus className="mr-2 h-4 w-4" /> Go to Devices
                        </Button>
                      </li>
                      <li>
                        <span className="font-semibold">Create Topics for Your Devices:</span> Define MQTT topics within each device for communication.<br/>
                        <Button size="sm" className="mt-2" onClick={() => navigate("/devices")}>
                          <ArrowRight className="mr-2 h-4 w-4" /> Select a Device
                        </Button>
                      </li>
                      <li>
                        <span className="font-semibold">Create Dashboards:</span> Make your own dashboards and select which device to track.<br/>
                        <Button size="sm" className="mt-2" onClick={() => navigate("/dashboards")}>
                          <Plus className="mr-2 h-4 w-4" /> Add Dashboard
                        </Button>
                      </li>
                      <li>
                        <span className="font-semibold">Edit Dashboard to Add Widgets:</span> Switch to "Edit Mode" in your dashboard and add widgets to display your device data.
                      </li>
                    </ol>
                    <div className="mt-8 text-muted-foreground text-sm">
                      <strong>Tip:</strong> You can always add more devices, topics, dashboards, or widgets as your needs evolve.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
