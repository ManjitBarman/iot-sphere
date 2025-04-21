
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Basic mock dashboards
const initialDashboards = [
  { id: "dash-1", name: "Main Dashboard", deviceId: "temp-001" },
];

const mockDevices = [
  { id: "temp-001", name: "Temperature Sensor" },
  { id: "hum-002", name: "Humidity Control" },
  { id: "light-003", name: "Smart Light" },
];

export default function DashboardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [showAddDashboard, setShowAddDashboard] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState("");
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const navigate = useNavigate();

  function handleAddDashboard(e: React.FormEvent) {
    e.preventDefault();
    if (!newDashboardName || !selectedDeviceId) return;
    setDashboards(ds => [
      ...ds, 
      { id: `dash-${ds.length+1}`, name: newDashboardName, deviceId: selectedDeviceId },
    ]);
    setShowAddDashboard(false);
    setNewDashboardName("");
    setSelectedDeviceId("");
  }

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
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      <LayoutDashboard className="w-7 h-7" /> 
                      Dashboards
                    </h1>
                    <p className="text-muted-foreground">Create your own dashboards. Select a device and add widgets in edit mode.</p>
                  </div>
                  <Button onClick={() => setShowAddDashboard(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Dashboard
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dashboards.length === 0 ? (
                    <Card>
                      <CardContent className="p-4 text-center">No dashboards yet. Click "Add Dashboard" to create one.</CardContent>
                    </Card>
                  ) : dashboards.map(dash => (
                    <Card key={dash.id}>
                      <CardHeader>
                        <CardTitle>{dash.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <strong>Device ID:</strong> {dash.deviceId}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => navigate(`/dashboard/${dash.id}`)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit Dashboard
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              {showAddDashboard && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
                  <div className="bg-card rounded-lg p-6 shadow-xl min-w-[350px] relative">
                    <button aria-label="Close" className="absolute right-2 top-2" onClick={() => setShowAddDashboard(false)}>
                      ×
                    </button>
                    <h3 className="text-lg font-semibold mb-4">Add Dashboard</h3>
                    <form onSubmit={handleAddDashboard} className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium">Dashboard Name</label>
                        <input
                          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                          value={newDashboardName}
                          onChange={e => setNewDashboardName(e.target.value)}
                          placeholder="Dashboard Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">Select Device</label>
                        <select
                          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                          value={selectedDeviceId}
                          onChange={e => setSelectedDeviceId(e.target.value)}
                          required
                        >
                          <option value="">Select device...</option>
                          {mockDevices.map(dev => (
                            <option key={dev.id} value={dev.id}>{dev.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={() => setShowAddDashboard(false)}>Cancel</Button>
                        <Button type="submit">Add Dashboard</Button>
                      </div>
                    </form>
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

