
import React from "react";
import { Button } from "@/components/ui/button";
import { Cpu, MoreHorizontal, Battery, Wifi, WifiOff, BatteryLow } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock device data
const devices = [
  {
    id: "DEV-001",
    name: "Temperature Sensor A1",
    type: "Temperature",
    location: "Building A, Floor 1",
    status: "Online",
    battery: 84,
    lastActivity: "2 minutes ago"
  },
  {
    id: "DEV-002",
    name: "Humidity Sensor B2",
    type: "Humidity",
    location: "Building B, Floor 2",
    status: "Online",
    battery: 92,
    lastActivity: "5 minutes ago"
  },
  {
    id: "DEV-003",
    name: "Motion Sensor C3",
    type: "Motion",
    location: "Building C, Floor 3",
    status: "Offline",
    battery: 56,
    lastActivity: "2 hours ago"
  },
  {
    id: "DEV-004",
    name: "Light Sensor D4",
    type: "Light",
    location: "Building D, Floor 4",
    status: "Online",
    battery: 23,
    lastActivity: "1 minute ago"
  },
  {
    id: "DEV-005",
    name: "Pressure Sensor E5",
    type: "Pressure",
    location: "Building E, Floor 5",
    status: "Offline",
    battery: 45,
    lastActivity: "1 day ago"
  }
];

export function AdminDevicesTable() {
  return (
    <div className="rounded-md border">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Device
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Location
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Status
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Battery
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Last Activity
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {devices.map((device) => (
              <tr
                key={device.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {device.type}
                  </span>
                </td>
                <td className="p-4 align-middle">{device.location}</td>
                <td className="p-4 align-middle">
                  {device.status === "Online" ? (
                    <div className="flex items-center">
                      <Wifi className="mr-2 h-4 w-4 text-green-500" />
                      <span>Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <WifiOff className="mr-2 h-4 w-4 text-red-500" />
                      <span>Offline</span>
                    </div>
                  )}
                </td>
                <td className="p-4 align-middle">
                  <div className="flex items-center gap-2">
                    {device.battery < 30 ? (
                      <BatteryLow className="h-4 w-4 text-red-500" />
                    ) : (
                      <Battery className="h-4 w-4 text-green-500" />
                    )}
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          device.battery > 70 ? 'bg-green-500' : 
                          device.battery > 30 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{device.battery}%</span>
                  </div>
                </td>
                <td className="p-4 align-middle">{device.lastActivity}</td>
                <td className="p-4 align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Configuration</DropdownMenuItem>
                      <DropdownMenuItem>View Data History</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Reboot Device</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Deactivate Device
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
