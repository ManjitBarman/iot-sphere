
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeviceTable } from "@/components/devices/DeviceTable";
import { Card } from "@/components/ui/card";

export default function DevicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [showAddDevice, setShowAddDevice] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">Devices</h1>
                    <p className="text-muted-foreground">
                      Register and manage your devices. Click a device to manage its MQTT topics or data.
                    </p>
                  </div>
                  <Button onClick={() => setShowAddDevice(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Device
                  </Button>
                </div>
                <Card className="p-3">
                  <DeviceTable />
                </Card>
              </div>
              {showAddDevice && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 animate-fade-in">
                  <div className="bg-card rounded-lg p-6 shadow-xl min-w-[350px] relative">
                    <button aria-label="Close" className="absolute right-2 top-2" onClick={() => setShowAddDevice(false)}>
                      ×
                    </button>
                    <h3 className="text-lg font-semibold mb-4">Add Device (Demo Only)</h3>
                    {/* Place holder for device form -- could link to DeviceForm */}
                    <div className="text-muted-foreground text-center pb-3">
                      Device registration goes here (not implemented).
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
