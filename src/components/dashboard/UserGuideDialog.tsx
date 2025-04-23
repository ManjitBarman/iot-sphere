
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PanelLeft, 
  Plus, 
  LayoutDashboard, 
  Settings, 
  Save, 
  Move, 
  Cpu, 
  BarChart3, 
  Users,
  FileText
} from "lucide-react";

type UserGuideDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UserGuideDialog({ open, onOpenChange }: UserGuideDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Getting Started with IoT Dashboard</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="widgets">Widgets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sharing">Sharing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-2 text-primary" />
                  Creating Your Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Follow these steps to create and customize your dashboard:
                </p>
                <ol className="space-y-4 mt-4">
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">1.</span>
                    <div>
                      <p className="font-medium">Enter Edit Mode</p>
                      <p className="text-sm text-muted-foreground">Click the "Enter Edit Mode" button at the top of your dashboard.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">2.</span>
                    <div>
                      <p className="font-medium">Add Widgets</p>
                      <p className="text-sm text-muted-foreground">Click the "Add Widget" button to open the widget selector.</p>
                      <div className="flex items-center gap-2 text-sm mt-1 bg-muted/30 p-2 rounded">
                        <Plus className="h-4 w-4 text-primary" />
                        <span>Add Widget</span>
                      </div>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">3.</span>
                    <div>
                      <p className="font-medium">Arrange Widgets</p>
                      <p className="text-sm text-muted-foreground">Drag and drop widgets to rearrange them on your dashboard.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">4.</span>
                    <div>
                      <p className="font-medium">Configure Settings</p>
                      <p className="text-sm text-muted-foreground">Click "Dashboard Settings" to change the layout type, theme, and other options.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">5.</span>
                    <div>
                      <p className="font-medium">Save Your Changes</p>
                      <p className="text-sm text-muted-foreground">Click "Save Changes" when you're done editing.</p>
                      <div className="flex items-center gap-2 text-sm mt-1 bg-muted/30 p-2 rounded">
                        <Save className="h-4 w-4 text-primary" />
                        <span>Save Changes</span>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="widgets">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-primary" />
                  Understanding Widgets
                </h3>
                <p className="text-muted-foreground mb-4">
                  Widgets display your device data in different formats. Here are the available widget types:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded p-3 space-y-2">
                    <div className="font-medium flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Chart Widget
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays time-series data as a line or bar chart. Best for temperature, humidity, or other numeric data over time.
                    </p>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="font-medium flex items-center">
                      <Cpu className="h-5 w-5 mr-2 text-primary" />
                      Status Widget
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Shows the current status of a device with visual indicators. Useful for on/off status, battery levels, or connection state.
                    </p>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="font-medium flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-primary" />
                      Value Widget
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Displays a single numeric value with a label. Perfect for current readings like temperature, pressure, or humidity.
                    </p>
                  </div>
                  
                  <div className="border rounded p-3 space-y-2">
                    <div className="font-medium flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      JSON Data Widget
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Shows raw JSON data from your device. Useful for debugging or viewing complex data structures.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-md font-semibold mt-6 mb-2">Working with Widgets</h4>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">1.</span>
                    <div>
                      <p className="font-medium">Adding a Widget</p>
                      <p className="text-sm text-muted-foreground">Select "Add Widget", choose a device, then select the widget type.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">2.</span>
                    <div>
                      <p className="font-medium">Moving Widgets</p>
                      <p className="text-sm text-muted-foreground">In edit mode, drag and drop widgets to reposition them.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">3.</span>
                    <div>
                      <p className="font-medium">Resizing Widgets</p>
                      <p className="text-sm text-muted-foreground">Some widgets come in different sizes. Choose the appropriate size when adding.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">4.</span>
                    <div>
                      <p className="font-medium">Auto-Format</p>
                      <p className="text-sm text-muted-foreground">Enable "Auto-Format Layout" to automatically arrange your widgets.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Analytics Features
                </h3>
                <p className="text-muted-foreground">
                  The Analytics section provides tools to analyze and report on your device data.
                </p>
                
                <div className="space-y-4 mt-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Historical Data</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      View and filter raw data from your devices over time.
                    </p>
                    <p className="text-sm bg-primary/10 p-2 rounded">
                      Access via: <span className="font-medium">Sidebar → Analytics → Historical Data</span>
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Filter options:</p>
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-1">
                        <li>By device</li>
                        <li>By date range</li>
                        <li>By data type</li>
                        <li>By value ranges</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-1">Report Generation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Create custom reports based on your device data.
                    </p>
                    <p className="text-sm bg-primary/10 p-2 rounded">
                      Access via: <span className="font-medium">Sidebar → Analytics → Reports</span>
                    </p>
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Report features:</p>
                      <ul className="list-disc pl-5 text-muted-foreground space-y-1 mt-1">
                        <li>Multiple report templates</li>
                        <li>Schedule recurring reports</li>
                        <li>Export as PDF, Excel, or CSV</li>
                        <li>Email reports to team members</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sharing">
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Sharing & Collaboration
                </h3>
                <p className="text-muted-foreground mb-4">
                  Share your dashboards with team members and set appropriate access permissions.
                </p>
                
                <h4 className="text-md font-medium">User Roles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
                  <div className="border rounded p-3">
                    <p className="font-medium">Viewer</p>
                    <p className="text-sm text-muted-foreground">
                      Can view dashboards but cannot make changes. Perfect for team members who only need to monitor data.
                    </p>
                  </div>
                  <div className="border rounded p-3">
                    <p className="font-medium">Editor</p>
                    <p className="text-sm text-muted-foreground">
                      Can view and edit dashboards. Suitable for team members who need to create or modify dashboards.
                    </p>
                  </div>
                </div>
                
                <h4 className="text-md font-medium mt-4">Adding Users</h4>
                <ol className="space-y-3 mt-2">
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">1.</span>
                    <div>
                      <p className="text-sm">Click "Manage Access" in the dashboard toolbar</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">2.</span>
                    <div>
                      <p className="text-sm">Enter the email address of the user you want to add</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">3.</span>
                    <div>
                      <p className="text-sm">Select the role (Viewer or Editor)</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="font-bold text-primary mr-3">4.</span>
                    <div>
                      <p className="text-sm">Click "Add" to send an invitation</p>
                    </div>
                  </li>
                </ol>
                
                <div className="bg-muted/30 p-3 rounded-md mt-4">
                  <p className="text-sm font-medium">Note</p>
                  <p className="text-xs text-muted-foreground">
                    Users will receive an email invitation to join your dashboard. They will need to create an account or sign in to access the shared dashboards.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close Guide</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
