
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// This is mock; replace with real device data.
const mockDevices = [
  { id: "dev-1", name: "Temperature Sensor", deviceId: "temp-001" },
  { id: "dev-2", name: "Humidity Control", deviceId: "hum-002" },
  { id: "dev-3", name: "Smart Light", deviceId: "light-003" },
];

const DevicesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

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
                    <p className="text-muted-foreground">Manage your connected devices. Click a device to view and manage its topics.</p>
                  </div>
                  <Button onClick={() => alert("Show add device dialog")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Device
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockDevices.map((device) => (
                    <Card 
                      className="hover:shadow-lg cursor-pointer transition"
                      key={device.id}
                      onClick={() => navigate(`/devices/${device.deviceId}`)}
                    >
                      <CardHeader>
                        <CardTitle>{device.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <span className="text-muted-foreground">Device ID: <strong>{device.deviceId}</strong></span>
                        <div className="mt-3">
                          <Button size="sm" variant="outline" onClick={e => {e.stopPropagation();navigate(`/devices/${device.deviceId}`)}}>
                            Manage Topics
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DevicesPage;
