
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HomeSteps from "@/components/dashboard/HomeSteps";
import QuickActions from "@/components/dashboard/QuickActions";
import GettingStartedGuide from "@/components/dashboard/GettingStartedGuide";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart3, Activity, ArrowRight, LayoutDashboard, Database, Plus, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Mock data for the dashboard
  const stats = [
    { title: "Active Devices", value: "36", change: "+4", changeType: "positive" },
    { title: "Data Points", value: "8.5k", change: "+12%", changeType: "positive" },
    { title: "Alerts", value: "2", change: "-3", changeType: "positive" },
    { title: "Uptime", value: "99.9%", change: "0.1%", changeType: "neutral" }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <main className="flex-1 p-8 bg-muted/20">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome to zsee IoT Platform</h1>
                    <p className="text-muted-foreground">
                      Manage your IoT devices, view analytics, and build interactive dashboards
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/devices")} 
                      className="h-10"
                    >
                      <Server className="mr-2 h-4 w-4" />
                      My Devices
                    </Button>
                    <Button 
                      onClick={() => navigate("/devices")} 
                      className="h-10"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Device
                    </Button>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className={`text-xs flex items-center ${
                              stat.changeType === 'positive' ? 'text-green-500' : 
                              stat.changeType === 'negative' ? 'text-red-500' : 
                              'text-muted-foreground'
                            }`}>
                              {stat.change}
                              {stat.changeType === 'positive' && <Activity className="ml-1 h-3 w-3" />}
                            </p>
                          </div>
                          <div className={`p-2 rounded-md ${
                            index === 0 ? 'bg-blue-100' : 
                            index === 1 ? 'bg-green-100' : 
                            index === 2 ? 'bg-yellow-100' :
                            'bg-purple-100'
                          }`}>
                            {index === 0 && <Server className={`h-5 w-5 ${index === 0 ? 'text-blue-600' : ''}`} />}
                            {index === 1 && <Database className={`h-5 w-5 ${index === 1 ? 'text-green-600' : ''}`} />}
                            {index === 2 && <Activity className={`h-5 w-5 ${index === 2 ? 'text-yellow-600' : ''}`} />}
                            {index === 3 && <BarChart3 className={`h-5 w-5 ${index === 3 ? 'text-purple-600' : ''}`} />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span className="flex items-center">
                          <LineChart className="h-5 w-5 mr-2 text-primary" />
                          Recent Activity
                        </span>
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => navigate("/analytics/historical")}>
                          View All <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px] flex items-center justify-center border rounded-md bg-muted/10">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>Activity visualization will appear here</p>
                          <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/analytics")}>
                            Go to Analytics
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <LayoutDashboard className="h-5 w-5 mr-2 text-primary" />
                        Quick Links
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/devices")}>
                        <Server className="mr-2 h-4 w-4" />
                        Manage Devices
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/dashboards")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Customize Dashboards
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/analytics")}>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/profile")}>
                        <Database className="mr-2 h-4 w-4" />
                        MQTT Credentials
                      </Button>
                    </CardContent>
                  </Card>
                </div>

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
