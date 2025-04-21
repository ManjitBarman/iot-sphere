
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

export default function DashboardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboards, setDashboards] = useState(initialDashboards);
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
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      <LayoutDashboard className="w-7 h-7" /> 
                      Dashboards
                    </h1>
                    <p className="text-muted-foreground">View and manage your dashboards. Each dashboard is linked to devices and can display data using widgets.</p>
                  </div>
                  <Button onClick={() => alert('Show dashboard create dialog (form to pick device, name, etc)')}>
                    <Plus className="mr-2 h-4 w-4" /> Add Dashboard
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dashboards.length === 0 ? (
                    <Card>
                      <CardContent className="p-4 text-center">No dashboards yet. Click "Add Dashboard" to get started.</CardContent>
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
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
