
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeviceTable } from "@/components/devices/DeviceTable";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DeviceForm } from "@/components/devices/DeviceForm";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";

export default function DevicesPage() {
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

  const handleDeviceAdded = () => {
    setShowAddDevice(false);
    toast({
      title: "Device Added",
      description: "The device has been successfully registered.",
    });
  };

  return (
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
        
        <Dialog open={showAddDevice} onOpenChange={setShowAddDevice}>
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Device</DialogTitle>
            </DialogHeader>
            <DeviceForm onSubmit={handleDeviceAdded} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
