
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Download, 
  LineChart, 
  FileText, 
  CalendarDays, 
  ArrowRight 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const mockDevices = [
  { id: "temp-001", name: "Temperature Sensor", type: "Temperature" },
  { id: "hum-002", name: "Humidity Sensor", type: "Humidity" },
  { id: "light-003", name: "Smart Light", type: "Lighting" }
];

const mockData = [
  { id: 1, timestamp: "2025-04-23 09:15:00", value: 23.5, deviceId: "temp-001" },
  { id: 2, timestamp: "2025-04-23 09:30:00", value: 24.2, deviceId: "temp-001" },
  { id: 3, timestamp: "2025-04-23 09:45:00", value: 23.8, deviceId: "temp-001" },
  { id: 4, timestamp: "2025-04-23 10:00:00", value: 45.5, deviceId: "hum-002" },
  { id: 5, timestamp: "2025-04-23 10:15:00", value: 46.3, deviceId: "hum-002" },
  { id: 6, timestamp: "2025-04-23 10:30:00", value: 47.1, deviceId: "hum-002" },
  { id: 7, timestamp: "2025-04-22 11:00:00", value: "ON", deviceId: "light-003" },
  { id: 8, timestamp: "2025-04-22 15:30:00", value: "OFF", deviceId: "light-003" },
  { id: 9, timestamp: "2025-04-23 09:00:00", value: "ON", deviceId: "light-003" },
];

export default function HistoricalDataPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const navigate = useNavigate();

  const filteredData = selectedDevice 
    ? mockData.filter(item => item.deviceId === selectedDevice)
    : mockData;

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <div className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                      <FileText className="h-6 w-6 text-primary" />
                      Historical Data
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      View and analyze historical device data over time
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" onClick={() => navigate("/analytics/reports")}>
                      <ArrowRight className="mr-2 h-4 w-4" /> View Reports
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" /> Export Data
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                        Date Range
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="last7days">Last 7 Days</SelectItem>
                          <SelectItem value="last30days">Last 30 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Device</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select 
                        value={selectedDevice || ""} 
                        onValueChange={val => setSelectedDevice(val || null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All devices" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All devices</SelectItem>
                          {mockDevices.map(device => (
                            <SelectItem key={device.id} value={device.id}>
                              {device.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="col-span-1 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-muted-foreground text-xs">Total Records</div>
                          <div className="text-2xl font-bold">{filteredData.length}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs">Devices</div>
                          <div className="text-2xl font-bold">
                            {new Set(filteredData.map(d => d.deviceId)).size}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Historical Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="table">
                      <TabsList className="mb-4">
                        <TabsTrigger value="table">
                          <span className="flex items-center">
                            <Table className="h-4 w-4 mr-2" />
                            Table View
                          </span>
                        </TabsTrigger>
                        <TabsTrigger value="chart">
                          <span className="flex items-center">
                            <LineChart className="h-4 w-4 mr-2" />
                            Chart View
                          </span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="table">
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Device</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Value</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredData.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No data available for the selected filters.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredData.map((item) => {
                                  const device = mockDevices.find(d => d.id === item.deviceId);
                                  return (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.timestamp}</TableCell>
                                      <TableCell>{device?.name || item.deviceId}</TableCell>
                                      <TableCell>{device?.type || "Unknown"}</TableCell>
                                      <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                  );
                                })
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </TabsContent>

                      <TabsContent value="chart">
                        <div className="h-80 flex items-center justify-center border rounded-md p-4">
                          <div className="text-muted-foreground">
                            Chart visualization will be implemented here
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
