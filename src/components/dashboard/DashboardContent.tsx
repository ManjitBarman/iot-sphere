
import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { WidgetCard } from "@/components/dashboard/widgets/WidgetCard";
import { ValueWidget } from "@/components/dashboard/widgets/ValueWidget";
import { ChartWidget } from "@/components/dashboard/widgets/ChartWidget";
import { DeviceStatusWidget } from "@/components/dashboard/widgets/DeviceStatusWidget";
import { JsonViewerWidget } from "@/components/dashboard/widgets/JsonViewerWidget";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

const DashboardContent = () => {
  const [deviceData] = useState(defaultDeviceData);

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-12rem)] rounded-lg border"
      >
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full flex-col">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full p-4">
                  <WidgetCard title="Device Status" className="w-full">
                    <DeviceStatusWidget 
                      deviceId={deviceData.deviceId}
                      batteryLevel={deviceData.payload.battery_level}
                      gridStatus={deviceData.payload.grid_status}
                      pumpStatus={deviceData.submersible_pump.status}
                    />
                  </WidgetCard>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full p-4">
                  <WidgetCard title="Temperature Data" className="w-full">
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
                  </WidgetCard>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={33}>
                <div className="grid grid-cols-2 gap-4 p-4 h-full">
                  <WidgetCard title="Current Name" className="flex flex-col">
                    <ValueWidget 
                      value={1}
                      label=""
                      large
                      color="#0070f3"
                    />
                  </WidgetCard>
                  <WidgetCard title="test_data" className="flex flex-col">
                    <ValueWidget 
                      value={6}
                      label=""
                      large
                      color="#00d5bd"
                    />
                  </WidgetCard>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={67}>
                <div className="p-4 h-full">
                  <WidgetCard title="JSON Data" className="h-full">
                    <JsonViewerWidget data={deviceData} />
                  </WidgetCard>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardContent;
