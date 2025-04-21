
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical, Wifi, WifiOff, SquareMenu } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Mock data - in a real app this would come from your API
const mockDevices = [
  { 
    id: "dev-1", 
    name: "Temperature Sensor", 
    deviceId: "temp-001", 
    type: "sensor", 
    status: "online",
    lastSeen: "2023-04-19T15:32:10Z"
  },
  { 
    id: "dev-2", 
    name: "Humidity Control", 
    deviceId: "hum-002", 
    type: "actuator", 
    status: "offline",
    lastSeen: "2023-04-18T09:15:22Z"
  },
  { 
    id: "dev-3", 
    name: "Smart Light", 
    deviceId: "light-003", 
    type: "actuator", 
    status: "online",
    lastSeen: "2023-04-19T16:05:47Z"
  },
];

export function DeviceTable() {
  const [devices] = useState(mockDevices);
  const navigate = useNavigate();

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Device ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Topics</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24">
                No devices found.
              </TableCell>
            </TableRow>
          ) : (
            devices.map((device) => (
              <TableRow key={device.id} className="cursor-pointer hover:bg-accent/40" onClick={() => navigate(`/devices/${device.deviceId}`)}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>{device.deviceId}</TableCell>
                <TableCell>
                  <Badge variant={device.type === "sensor" ? "secondary" : "outline"}>
                    {device.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {device.status === "online" ? (
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 text-green-500 mr-2" />
                      <span>Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <WifiOff className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-muted-foreground">Offline</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(device.lastSeen).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/devices/${device.deviceId}#topics`);
                    }}
                  >
                    <SquareMenu className="h-4 w-4" />
                    Manage Topics
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="text-xs text-muted-foreground mt-2 ml-2">
        <SquareMenu className="inline h-3 w-3" /> <span>Click "Manage Topics" to view/manage topics inside device.</span>
      </div>
    </div>
  );
}
