
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, User, Mail, Phone, Building2, MapPin, Key, Download } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    organization: "IoT Solutions Inc.",
    country: "United States",
    city: "San Francisco",
    state: "California",
    pincode: "94105",
    streetAddress: "123 IoT Street",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
    
    setIsUpdating(false);
  };

  const handleRequestPasswordChange = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "Please check your email for password reset instructions.",
    });
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
      });
    }
  };

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader editMode={editMode} setEditMode={setEditMode} />
          <div className="container max-w-4xl py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account information and credentials</p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="profile" className="text-base">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </TabsTrigger>
                <TabsTrigger value="mqtt" className="text-base">
                  <Key className="mr-2 h-4 w-4" />
                  MQTT Credentials
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      {editMode ? "Update your profile information" : "Your profile information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
                          <img
                            src="/placeholder.svg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {editMode && (
                          <label
                            htmlFor="profile-picture"
                            className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                          >
                            <Camera className="h-4 w-4" />
                            <input
                              type="file"
                              id="profile-picture"
                              className="hidden"
                              accept="image/*"
                              onChange={handleProfilePictureUpload}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {editMode ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              value={formData.email}
                              readOnly
                              disabled
                              className="bg-muted"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                              id="organization"
                              name="organization"
                              value={formData.organization}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="streetAddress">Street Address</Label>
                            <Input
                              id="streetAddress"
                              name="streetAddress"
                              value={formData.streetAddress}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                              id="pincode"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <Button 
                            type="submit" 
                            disabled={isUpdating}
                            className="flex-1 sm:flex-none"
                          >
                            {isUpdating ? "Updating..." : "Save Changes"}
                          </Button>
                          
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleRequestPasswordChange}
                            className="flex-1 sm:flex-none"
                          >
                            Request Password Change
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setEditMode(false)}
                            className="flex-1 sm:flex-none"
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="h-4 w-4" />
                              <span className="text-sm font-medium">Full Name</span>
                            </div>
                            <p className="text-lg">{formData.name}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span className="text-sm font-medium">Email</span>
                            </div>
                            <p className="text-lg">{formData.email}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span className="text-sm font-medium">Phone Number</span>
                            </div>
                            <p className="text-lg">{formData.phone}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building2 className="h-4 w-4" />
                              <span className="text-sm font-medium">Organization</span>
                            </div>
                            <p className="text-lg">{formData.organization}</p>
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm font-medium">Address</span>
                            </div>
                            <p className="text-lg">
                              {formData.streetAddress}, {formData.city}, {formData.state}, {formData.country} - {formData.pincode}
                            </p>
                          </div>
                        </div>

                        <Button 
                          onClick={() => setEditMode(true)}
                          className="mt-6"
                        >
                          Update Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="mqtt">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      MQTT Credentials
                    </CardTitle>
                    <CardDescription>
                      Your MQTT connection details for device communication
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
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
