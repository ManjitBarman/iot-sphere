import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Download, Plus, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeviceTable } from "@/components/devices/DeviceTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function DevicesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [showAddDevice, setShowAddDevice] = useState(false);
  const { toast } = useToast();

  const handleDownloadCredentials = () => {
    const mqttCredentials = {
      brokerUrl: "mqtt://broker.example.com:1883",
      username: "device_123",
      password: "secure_password_456",
      clientId: "iot_client_789"
    };

    const content = `MQTT Credentials:
Broker URL: ${mqttCredentials.brokerUrl}
Username: ${mqttCredentials.username}
Password: ${mqttCredentials.password}
Client ID: ${mqttCredentials.clientId}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mqtt-credentials.txt';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Credentials Downloaded",
      description: "Your MQTT credentials have been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className="max-w-6xl mx-auto">
                <Tabs defaultValue="devices" className="w-full space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="mqtt">MQTT Config</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="devices">
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
                  </TabsContent>
                  
                  <TabsContent value="mqtt">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Key className="h-5 w-5" />
                          MQTT Connection Details
                        </CardTitle>
                        <CardDescription>
                          Your MQTT connection details for all device communications
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <Label>Broker URL</Label>
                              <Input 
                                value="mqtt://broker.example.com:1883"
                                readOnly
                                className="bg-muted font-mono text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Username</Label>
                              <Input 
                                value="device_123"
                                readOnly
                                className="bg-muted font-mono text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Client ID</Label>
                              <Input 
                                value="iot_client_789"
                                readOnly
                                className="bg-muted font-mono text-sm"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Password</Label>
                              <Input 
                                type="password"
                                value="secure_password_456"
                                readOnly
                                className="bg-muted font-mono text-sm"
                              />
                            </div>
                          </div>
                          <Button 
                            onClick={handleDownloadCredentials}
                            className="w-full sm:w-auto"
                            variant="outline"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Credentials
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
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
        </div>
      </SidebarProvider>
    </div>
  );
}
