
import { useState } from "react";
import { ValueWidget } from "@/components/dashboard/widgets/ValueWidget";
import { ChartWidget } from "@/components/dashboard/widgets/ChartWidget";
import { DeviceStatusWidget } from "@/components/dashboard/widgets/DeviceStatusWidget";
import { JsonViewerWidget } from "@/components/dashboard/widgets/JsonViewerWidget";
import { WidgetCard } from "@/components/dashboard/widgets/WidgetCard";
import { WidgetGrid } from "@/components/dashboard/widgets/WidgetGrid";

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

const DashboardContent = ({ editMode }: DashboardContentProps) => {
  const [deviceData] = useState(defaultDeviceData);

  return (
    <div className="flex-1 p-4 lg:p-6 overflow-auto bg-muted/20">
      <WidgetGrid editMode={editMode}>
        <WidgetCard 
          title="Device Status" 
          size="md"
          className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
        >
          <DeviceStatusWidget 
            deviceId={deviceData.deviceId}
            batteryLevel={deviceData.payload.battery_level}
            gridStatus={deviceData.payload.grid_status}
            pumpStatus={deviceData.submersible_pump.status}
          />
        </WidgetCard>
        
        <WidgetCard 
          title="Temperature Data" 
          size="md"
          className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
        >
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
        
        <WidgetCard 
          title="Current Reading" 
          size="sm"
          className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
        >
          <ValueWidget 
            value={1}
            label="Current"
            large
            color="#0070f3"
          />
        </WidgetCard>
        
        <WidgetCard 
          title="Humidity Level" 
          size="sm"
          className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
        >
          <ValueWidget 
            value={deviceData.humidity.level}
            label="Level"
            large
            color="#00d5bd"
          />
        </WidgetCard>
        
        <WidgetCard 
          title="JSON Data" 
          size="lg"
          className={`${editMode ? 'cursor-move border-dashed border-2' : ''}`}
        >
          <JsonViewerWidget data={deviceData} />
        </WidgetCard>
      </WidgetGrid>
    </div>
  );
};

export default DashboardContent;
