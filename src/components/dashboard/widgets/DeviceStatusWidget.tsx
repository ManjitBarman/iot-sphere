
import { Battery, Cable, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceStatusWidgetProps {
  deviceId: number;
  batteryLevel: number;
  gridStatus: number;
  pumpStatus: number;
}

export function DeviceStatusWidget({ 
  deviceId, 
  batteryLevel, 
  gridStatus, 
  pumpStatus 
}: DeviceStatusWidgetProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-lg font-semibold">Device ID: {deviceId}</div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Battery 
            className={cn(
              "h-5 w-5",
              batteryLevel > 80 ? "text-green-500" :
              batteryLevel > 20 ? "text-yellow-500" : "text-red-500"
            )} 
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Battery</span>
            <span className={cn(
              "text-xs",
              batteryLevel > 80 ? "text-green-500" :
              batteryLevel > 20 ? "text-yellow-500" : "text-red-500"
            )}>
              {batteryLevel}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Cable 
            className={cn(
              "h-5 w-5",
              gridStatus === 1 ? "text-green-500" : "text-red-500"
            )} 
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Grid Status</span>
            <span className={cn(
              "text-xs",
              gridStatus === 1 ? "text-green-500" : "text-red-500"
            )}>
              {gridStatus === 1 ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplet 
            className={cn(
              "h-5 w-5",
              pumpStatus === 1 ? "text-green-500" : 
              pumpStatus === 0 ? "text-gray-500" : "text-red-500"
            )} 
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Pump Status</span>
            <span className={cn(
              "text-xs",
              pumpStatus === 1 ? "text-green-500" : 
              pumpStatus === 0 ? "text-gray-500" : "text-red-500"
            )}>
              {pumpStatus === 1 ? "Active" : 
              pumpStatus === 0 ? "Inactive" : "Error"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
