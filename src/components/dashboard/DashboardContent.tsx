
import { useState } from "react";
import { ValueWidget } from "@/components/dashboard/widgets/ValueWidget";
import { ChartWidget } from "@/components/dashboard/widgets/ChartWidget";
import { DeviceStatusWidget } from "@/components/dashboard/widgets/DeviceStatusWidget";
import { JsonViewerWidget } from "@/components/dashboard/widgets/JsonViewerWidget";
import { WidgetCard } from "@/components/dashboard/widgets/WidgetCard";
import { WidgetGrid } from "@/components/dashboard/widgets/WidgetGrid";
import { WidgetSelector } from "@/components/dashboard/widgets/WidgetSelector";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultDeviceData = {
  deviceId: 1024,
  payload: {
    battery_time_remaining: 120,
    battery_level: 51,
    grid_status: 1,
    bulk_flow_meter_reading: 2492,
    bulk_flow_meter_rate: 0,
    delivery_valve: 15.6,
    surface_pump_switchover: 1,
    backwash_indication: 30
  },
  temperature: {
    value: 1,
    total_kWh: 0,
    total_kWh_f: 752.799878,
    realtime_current: 0
  },
  humidity: {
    level: 6,
    ugm: 43,
    tsi: 0.31999993
  },
  submersible_pump: {
    status: 0,
    current: 0,
    fault: {
      fault_exist: 0,
      fault_code: 0
    }
  },
  surface_pumps: {
    status: 0,
    current: 0,
    fault: {
      fault_exist: 0,
      fault_code: 0
    }
  }
};

interface DashboardContentProps {
  editMode: boolean;
}

// Mock devices for the demo
const availableDevices = [
  { id: "dev-1", name: "Temperature Sensor" },
  { id: "dev-2", name: "Humidity Control" },
  { id: "dev-3", name: "Smart Light" },
];

const DashboardContent = ({ editMode }: DashboardContentProps) => {
  const [deviceData] = useState(defaultDeviceData);
  const [widgets, setWidgets] = useState([
    {
      id: "widget-1",
      title: "Device Status",
      type: "status",
      size: "md",
      device: "dev-1",
    },
    {
      id: "widget-2",
      title: "Temperature Data",
      type: "chart",
      size: "md",
      device: "dev-1",
    },
    {
      id: "widget-3",
      title: "Current Reading",
      type: "value",
      size: "sm",
      device: "dev-2",
    },
    {
      id: "widget-4",
      title: "Humidity Level",
      type: "value",
      size: "sm",
      device: "dev-2",
    },
    {
      id: "widget-5",
      title: "JSON Data",
      type: "json",
      size: "lg",
      device: "dev-3",
    },
  ]);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddWidget = (widgetType: string, size: "sm" | "md" | "lg") => {
    if (!selectedDevice) {
      toast({
        title: "Device Required",
        description: "Please select a device for this widget",
        variant: "destructive",
      });
      return;
    }

    const newWidget = {
      id: `widget-${Date.now()}`,
      title: `New ${widgetType} Widget`,
      type: widgetType,
      size,
      device: selectedDevice,
    };

    setWidgets([...widgets, newWidget]);
    setShowWidgetSelector(false);
    setSelectedDevice(null);

    toast({
      title: "Widget Added",
      description: "New widget has been added to your dashboard",
    });
  };

  const handleSaveDashboard = () => {
    // In a real app, you would save the dashboard configuration to your backend
    toast({
      title: "Dashboard Saved",
      description: "Your dashboard changes have been saved",
    });
  };

  const renderWidget = (widget: any) => {
    switch (widget.type) {
      case "status":
        return (
          <DeviceStatusWidget 
            deviceId={deviceData.deviceId}
            batteryLevel={deviceData.payload.battery_level}
            gridStatus={deviceData.payload.grid_status}
            pumpStatus={deviceData.submersible_pump.status}
          />
        );
      case "chart":
        return (
          <ChartWidget 
            data={[
              { name: "12:00", value: deviceData.temperature.value },
              { name: "13:00", value: deviceData.temperature.value + 0.5 },
              { name: "14:00", value: deviceData.temperature.value + 0.8 },
              { name: "15:00", value: deviceData.temperature.value + 0.2 },
              { name: "16:00", value: deviceData.temperature.value + 1.0 },
            ]}
            xAxisKey="name"
            yAxisKey="value"
            color="#0070f3"
          />
        );
      case "value":
        return (
          <ValueWidget 
            value={widget.title.includes("Humidity") ? deviceData.humidity.level : 1}
            label={widget.title.includes("Humidity") ? "Level" : "Current"}
            large
            color={widget.title.includes("Humidity") ? "#00d5bd" : "#0070f3"}
          />
        );
      case "json":
        return <JsonViewerWidget data={deviceData} />;
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-auto bg-muted/20">
      {editMode && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-dashed flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Dashboard Edit Mode</h3>
            <p className="text-sm text-muted-foreground">
              Add and arrange widgets to customize your dashboard
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowWidgetSelector(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Widget
            </Button>
            <Button onClick={handleSaveDashboard}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <WidgetGrid editMode={editMode}>
        {widgets.map((widget) => (
          <WidgetCard 
            key={widget.id}
            title={widget.title} 
            size={widget.size as "sm" | "md" | "lg" | "xl"}
            className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
            device={availableDevices.find(d => d.id === widget.device)?.name}
            editMode={editMode}
            onDelete={() => {
              setWidgets(widgets.filter(w => w.id !== widget.id));
              toast({
                title: "Widget Removed",
                description: "Widget has been removed from your dashboard",
              });
            }}
          >
            {renderWidget(widget)}
          </WidgetCard>
        ))}
      </WidgetGrid>

      {showWidgetSelector && (
        <WidgetSelector 
          isOpen={showWidgetSelector}
          onClose={() => setShowWidgetSelector(false)}
          onSelectWidget={handleAddWidget}
          devices={availableDevices}
          selectedDevice={selectedDevice}
          onSelectDevice={setSelectedDevice}
        />
      )}
    </div>
  );
};

export default DashboardContent;
