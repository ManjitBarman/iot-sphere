import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Plus, Edit, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
                      <span className="inline-block mr-2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
                        <LayoutDashboard className="h-6 w-6" />
                      </span>
                      Dashboards
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Create and manage your device dashboards
                    </p>
                  </div>
                  <Button onClick={() => setShowAddDashboard(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Dashboard
                  </Button>
                </div>

                <div className="bg-card rounded-lg border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dashboard Name</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboards.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                            No dashboards yet. Click "Add Dashboard" to create one.
                          </TableCell>
                        </TableRow>
                      ) : (
                        dashboards.map((dash) => (
                          <TableRow key={dash.id} className="group">
                            <TableCell className="font-medium">{dash.name}</TableCell>
                            <TableCell>
                              {mockDevices.find((d) => d.id === dash.deviceId)?.name || dash.deviceId}
                            </TableCell>
                            <TableCell>Just now</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/dashboard/${dash.id}`)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Keep the add dashboard modal */}
              {showAddDashboard && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
                  <div className="bg-card rounded-lg p-6 shadow-xl min-w-[350px] relative">
                    <button aria-label="Close" className="absolute right-2 top-2 text-lg" onClick={() => setShowAddDashboard(false)}>
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
                        <span className="text-xs text-muted-foreground">Device required for dashboard widgets.</span>
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
