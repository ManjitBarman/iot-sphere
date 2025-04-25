import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Info, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock device and topics (replace with API calls in production)
const mockDevices = [
  { 
    id: "dev-1", 
    name: "Temperature Sensor", 
    deviceId: "temp-001", 
    type: "sensor", 
    status: "online"
  },
  {
    id: "dev-2",
    name: "Humidity Control",
    deviceId: "hum-002",
    type: "actuator",
    status: "offline"
  },
  { 
    id: "dev-3", 
    name: "Smart Light", 
    deviceId: "light-003", 
    type: "actuator", 
    status: "online"
  }
];

const mockTopics = [
  { 
    id: "topic-1", 
    name: "Temperature Reading", 
    topicPath: "devices/temp-001/temperature", 
    deviceId: "temp-001", 
    type: "subscribe",
    dataType: "number",
  },
  { 
    id: "topic-2", 
    name: "Humidity Control", 
    topicPath: "devices/hum-002/humidity/set", 
    deviceId: "hum-002",
    type: "publish",
    dataType: "number",
  },
  { 
    id: "topic-3", 
    name: "Light Status", 
    topicPath: "devices/light-003/status", 
    deviceId: "light-003",
    type: "subscribe",
    dataType: "boolean",
  },
];

export default function DeviceDetailsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddTopic, setShowAddTopic] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const device = mockDevices.find(d => d.deviceId === params.deviceId);
  const deviceTopics = mockTopics.filter(t => t.deviceId === device?.deviceId);

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
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <h2 className="text-2xl font-semibold">{device?.name} ({device?.deviceId})</h2>
                </div>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Device Details</TabsTrigger>
                    <TabsTrigger value="mqtt">MQTT Config</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Device Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div><strong>Type:</strong> {device?.type}</div>
                          <div><strong>Status:</strong> {device?.status}</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex-row items-center justify-between">
                        <CardTitle>Topics</CardTitle>
                        <Button onClick={() => setShowAddTopic(true)} size="sm" className="ml-auto">
                          <Plus className="mr-2 h-4 w-4" /> Add Topic
                        </Button>
                      </CardHeader>
                      <CardContent>
                        {deviceTopics.length === 0 ? (
                          <div className="text-muted-foreground italic">No topics for this device yet.</div>
                        ) : (
                          <table className="w-full text-sm mt-2">
                            <thead>
                              <tr className="text-muted-foreground text-left">
                                <th className="py-1">Name</th>
                                <th>Path</th>
                                <th>Type</th>
                                <th>Data Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {deviceTopics.map(topic => (
                                <tr key={topic.id}>
                                  <td className="py-1 font-medium">{topic.name}</td>
                                  <td><code className="bg-muted px-2 py-1 rounded">{topic.topicPath}</code></td>
                                  <td>{topic.type}</td>
                                  <td>{topic.dataType}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="mqtt" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="h-5 w-5" />
                          MQTT Connection Details
                        </CardTitle>
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
                
                {showAddTopic && (
                  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-card rounded-lg p-6 shadow-xl min-w-[350px] relative">
                      <button aria-label="Close" className="absolute right-2 top-2" onClick={() => setShowAddTopic(false)}>
                        ×
                      </button>
                      <h3 className="text-lg font-semibold mb-2">Add Topic</h3>
                      {/* <TopicForm onSubmit={() => setShowAddTopic(false)} /> */}
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
