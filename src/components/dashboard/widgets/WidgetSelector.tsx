
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Database, Gauge } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  const widgetTypes = [
    {
      type: "chart",
      title: "Chart Widget",
      description: "Visualize time series data as a line or bar chart",
      icon: <BarChart3 className="w-10 h-10 text-primary" />,
      defaultSize: "md",
    },
    {
      type: "value",
      title: "Value Widget",
      description: "Display a single numeric value with a label",
      icon: <Gauge className="w-10 h-10 text-primary" />,
      defaultSize: "sm",
    },
    {
      type: "status",
      title: "Status Widget",
      description: "Show the current status of a device or component",
      icon: <Activity className="w-10 h-10 text-primary" />,
      defaultSize: "md",
    },
    {
      type: "json",
      title: "JSON Data Widget",
      description: "Display raw JSON data from your device",
      icon: <Database className="w-10 h-10 text-primary" />,
      defaultSize: "lg",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Widget to Dashboard</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="device-select">Select Device</Label>
          <Select 
            value={selectedDevice || ""} 
            onValueChange={onSelectDevice}
          >
            <SelectTrigger id="device-select" className="w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {widgetTypes.map((widget) => (
            <Card key={widget.type} className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  {widget.icon}
                  <CardTitle>{widget.title}</CardTitle>
                </div>
                <CardDescription>{widget.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => onSelectWidget(widget.type, widget.defaultSize as "sm" | "md" | "lg")}
                  disabled={!selectedDevice}
                >
                  Add to Dashboard
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
