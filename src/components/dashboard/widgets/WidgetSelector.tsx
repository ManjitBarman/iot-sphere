
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Database, Gauge, CheckCircle2, Info } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type Device = {
  id: string;
  name: string;
};

type WidgetSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectWidget: (type: string, size: "sm" | "md" | "lg") => void;
  devices: Device[];
  selectedDevice: string | null;
  onSelectDevice: (deviceId: string) => void;
};

export function WidgetSelector({
  isOpen,
  onClose,
  onSelectWidget,
  devices,
  selectedDevice,
  onSelectDevice,
}: WidgetSelectorProps) {
  const [selectedWidgetType, setSelectedWidgetType] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md");
  
  const widgetTypes = [
    {
      type: "chart",
      title: "Chart Widget",
      description: "Visualize time series data as a line or bar chart",
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      defaultSize: "md",
      useCases: "Temperature trends, humidity levels over time, energy consumption patterns",
    },
    {
      type: "value",
      title: "Value Widget",
      description: "Display a single numeric value with a label",
      icon: <Gauge className="w-10 h-10 text-primary" />,
      defaultSize: "sm",
      useCases: "Current temperature, humidity percentage, power consumption",
    },
    {
      type: "status",
      title: "Status Widget",
      description: "Show the current status of a device or component",
      icon: <Activity className="w-10 h-10 text-primary" />,
      defaultSize: "md",
      useCases: "Device online/offline status, battery levels, connection quality",
    },
    {
      type: "json",
      title: "JSON Data Widget",
      description: "Display raw JSON data from your device",
      icon: <Database className="w-10 h-10 text-primary" />,
      defaultSize: "lg",
      useCases: "Diagnostic data, complex sensor readings, debugging information",
    },
  ];

  const handleSelectWidget = (type: string) => {
    setSelectedWidgetType(type);
    const widget = widgetTypes.find(w => w.type === type);
    if (widget) {
      setSelectedSize(widget.defaultSize as "sm" | "md" | "lg");
    }
  };
  
  const handleAddWidget = () => {
    if (selectedWidgetType) {
      onSelectWidget(selectedWidgetType, selectedSize);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Widget to Dashboard</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="widget-gallery">
          <TabsList className="mb-4">
            <TabsTrigger value="widget-gallery">Widget Gallery</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>
          
          <TabsContent value="widget-gallery">
            <div className="mb-6">
              <Label htmlFor="device-select" className="text-base font-medium">Select Device</Label>
              <Select 
                value={selectedDevice || ""} 
                onValueChange={onSelectDevice}
              >
                <SelectTrigger id="device-select" className="w-full mt-1">
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Choose which device this widget will display data from
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {widgetTypes.map((widget) => (
                <Card 
                  key={widget.type} 
                  className={`cursor-pointer transition-all ${selectedWidgetType === widget.type 
                    ? 'border-primary ring-1 ring-primary' 
                    : 'hover:border-primary/50'}`}
                  onClick={() => handleSelectWidget(widget.type)}
                >
                  <CardHeader className="p-4 pb-2 text-center">
                    {widget.icon}
                    {selectedWidgetType === widget.type && (
                      <CheckCircle2 className="h-6 w-6 text-primary absolute top-2 right-2" />
                    )}
                  </CardHeader>
                  <CardContent className="text-center px-2 pb-2">
                    <h3 className="font-medium">{widget.title}</h3>
                    <p className="text-xs text-muted-foreground">{widget.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedWidgetType && (
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-muted/50 p-3 rounded-full">
                    {widgetTypes.find(w => w.type === selectedWidgetType)?.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">
                      {widgetTypes.find(w => w.type === selectedWidgetType)?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {widgetTypes.find(w => w.type === selectedWidgetType)?.description}
                    </p>
                    <div className="mt-4">
                      <Label className="mb-1 block">Widget Size</Label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedSize("sm")}
                          className={`px-4 py-2 border rounded-md ${
                            selectedSize === "sm" ? "bg-primary text-white" : "bg-background"
                          }`}
                        >
                          Small
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedSize("md")}
                          className={`px-4 py-2 border rounded-md ${
                            selectedSize === "md" ? "bg-primary text-white" : "bg-background"
                          }`}
                        >
                          Medium
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedSize("lg")}
                          className={`px-4 py-2 border rounded-md ${
                            selectedSize === "lg" ? "bg-primary text-white" : "bg-background"
                          }`}
                        >
                          Large
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-start gap-2 bg-muted/30 p-2 rounded">
                      <Info className="h-4 w-4 mt-0.5 text-primary" />
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Best for:</span> {widgetTypes.find(w => w.type === selectedWidgetType)?.useCases}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddWidget}
                disabled={!selectedWidgetType || !selectedDevice}
              >
                Add to Dashboard
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="text-center py-8">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">Recommended Widgets</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
                Our AI analyzes your devices and data patterns to suggest the most useful widgets for your dashboard.
              </p>
              <Button className="mt-6">
                Enable AI Recommendations
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
