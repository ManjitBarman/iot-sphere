
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Check, Plus, Cpu, MessageSquare, LayoutDashboard, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Normally these would come from your backend/state management
  const hasDevices = false;
  const hasTopics = false;
  const hasDashboards = false;

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Welcome to zsee IoT Platform</h1>
                <p className="text-muted-foreground mb-8">Follow these steps to get started with your IoT solution</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <Card className={`border-l-4 ${hasDevices ? 'border-l-green-500' : 'border-l-primary'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>
                        Create Devices
                      </CardTitle>
                      <CardDescription>Register your IoT devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Add your physical devices to monitor and control them through the platform.</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => navigate("/dashboard/devices")}
                        variant={hasDevices ? "outline" : "default"}
                      >
                        {hasDevices ? (
                          <><Check className="w-4 h-4 mr-2" /> Devices Created</>
                        ) : (
                          <><Plus className="w-4 h-4 mr-2" /> Create Devices</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className={`border-l-4 ${hasTopics ? 'border-l-green-500' : 'border-l-primary/40'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/40 text-primary-foreground text-sm">2</span>
                        Configure MQTT Topics
                      </CardTitle>
                      <CardDescription>Set up data channels</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Define MQTT topics for your devices to publish and subscribe to data.</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => navigate("/dashboard/topics")}
                        variant={hasTopics ? "outline" : "default"}
                        disabled={!hasDevices}
                      >
                        {hasTopics ? (
                          <><Check className="w-4 h-4 mr-2" /> Topics Configured</>
                        ) : (
                          <><Plus className="w-4 h-4 mr-2" /> Configure Topics</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className={`border-l-4 ${hasDashboards ? 'border-l-green-500' : 'border-l-primary/20'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary-foreground text-sm">3</span>
                        Create Dashboards
                      </CardTitle>
                      <CardDescription>Visualize your data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Build custom dashboards with widgets to monitor your devices in real-time.</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => navigate("/dashboard")}
                        variant={hasDashboards ? "outline" : "default"}
                        disabled={!hasTopics}
                      >
                        {hasDashboards ? (
                          <><Check className="w-4 h-4 mr-2" /> Dashboards Created</>
                        ) : (
                          <><Plus className="w-4 h-4 mr-2" /> Create Dashboards</>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <Button variant="outline" className="justify-start" onClick={() => navigate("/dashboard/devices")}>
                        <Cpu className="mr-2 h-4 w-4" />
                        Manage Devices
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => navigate("/dashboard/topics")}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Manage MQTT Topics
                      </Button>
                      <Button variant="outline" className="justify-start" onClick={() => navigate("/dashboard")}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        View Dashboards
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started Guide</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">New to IoT? Follow our step-by-step guide to set up your first connected device.</p>
                      <Button className="w-full">
                        View Guide <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardHome;
