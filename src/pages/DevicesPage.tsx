import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { DeviceTable } from "@/components/devices/DeviceTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DeviceForm } from "@/components/devices/DeviceForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const DevicesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const navigate = useNavigate();

  // This is mock; replace with real device data.
  const mockDevices = [
    { id: "dev-1", name: "Temperature Sensor", deviceId: "temp-001" },
    { id: "dev-2", name: "Humidity Control", deviceId: "hum-002" },
    { id: "dev-3", name: "Smart Light", deviceId: "light-003" },
  ];

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
                    <p className="text-muted-foreground">Manage your connected IoT devices. Click a device row to view device topics.</p>
                  </div>
                  <Button onClick={() => setShowDeviceForm(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Device
                  </Button>
                </div>

                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="py-2 text-left">Name</th>
                        <th className="py-2 text-left">Device ID</th>
                        <th className="py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDevices.map((device) => (
                        <tr key={device.id} className="cursor-pointer hover:bg-muted/50 transition"
                          onClick={() => navigate(`/devices/${device.deviceId}`)}>
                          <td className="py-2">{device.name}</td>
                          <td className="py-2">{device.deviceId}</td>
                          <td className="py-2">
                            <Button size="sm" variant="outline" onClick={(e) => {e.stopPropagation(); setShowDeviceForm(true);}}>Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Sheet open={showDeviceForm} onOpenChange={setShowDeviceForm}>
                  <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Add New Device</SheetTitle>
                    </SheetHeader>
                    <DeviceForm onSubmit={() => setShowDeviceForm(false)} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DevicesPage;
