
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Download, FileText, Filter, Printer, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockHistoricalData = [
  { id: 1, deviceName: "Temperature Sensor", deviceId: "temp-001", reading: "24.5°C", timestamp: "2025-04-23 09:15:00", status: "Normal" },
  { id: 2, deviceName: "Temperature Sensor", deviceId: "temp-001", reading: "25.2°C", timestamp: "2025-04-23 10:15:00", status: "Normal" },
  { id: 3, deviceName: "Temperature Sensor", deviceId: "temp-001", reading: "27.8°C", timestamp: "2025-04-23 11:15:00", status: "Warning" },
  { id: 4, deviceName: "Humidity Control", deviceId: "hum-002", reading: "45%", timestamp: "2025-04-23 09:15:00", status: "Normal" },
  { id: 5, deviceName: "Humidity Control", deviceId: "hum-002", reading: "40%", timestamp: "2025-04-23 10:15:00", status: "Normal" },
  { id: 6, deviceName: "Smart Light", deviceId: "light-003", reading: "On", timestamp: "2025-04-23 09:15:00", status: "Active" },
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateFilter, setDateFilter] = useState("today");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const { toast } = useToast();

  const generateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your report is being generated and will be available shortly.",
    });
  };

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
                      <span className="inline-block mr-2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6" />
                      </span>
                      Analytics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      View historical data and generate reports
                    </p>
                  </div>
                </div>

                <Card className="mb-8">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Device Data</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={generateReport}>
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="historical" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="historical">Historical Data</TabsTrigger>
                        <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="historical" className="w-full">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <input
                                type="text"
                                placeholder="Search data..."
                                className="pl-8 h-9 w-[250px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              />
                            </div>
                            <Button variant="ghost" size="sm">
                              <Filter className="h-4 w-4 mr-2" />
                              Filters
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <select 
                              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              value={deviceFilter}
                              onChange={(e) => setDeviceFilter(e.target.value)}
                            >
                              <option value="all">All Devices</option>
                              <option value="temp-001">Temperature Sensor</option>
                              <option value="hum-002">Humidity Control</option>
                              <option value="light-003">Smart Light</option>
                            </select>
                            <select 
                              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                              value={dateFilter}
                              onChange={(e) => setDateFilter(e.target.value)}
                            >
                              <option value="today">Today</option>
                              <option value="yesterday">Yesterday</option>
                              <option value="week">Last 7 days</option>
                              <option value="month">Last 30 days</option>
                              <option value="custom">Custom Range</option>
                            </select>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Select Date
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Device</TableHead>
                                <TableHead>Device ID</TableHead>
                                <TableHead>Reading</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {mockHistoricalData
                                .filter(data => deviceFilter === "all" || data.deviceId === deviceFilter)
                                .map((data) => (
                                  <TableRow key={data.id}>
                                    <TableCell className="font-medium">{data.deviceName}</TableCell>
                                    <TableCell>{data.deviceId}</TableCell>
                                    <TableCell>{data.reading}</TableCell>
                                    <TableCell>{data.timestamp}</TableCell>
                                    <TableCell>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        data.status === "Normal" ? "bg-green-100 text-green-800" :
                                        data.status === "Warning" ? "bg-yellow-100 text-yellow-800" :
                                        data.status === "Active" ? "bg-blue-100 text-blue-800" :
                                        "bg-gray-100 text-gray-800"
                                      }`}>
                                        {data.status}
                                      </span>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-muted-foreground">
                            Showing {mockHistoricalData.filter(data => deviceFilter === "all" || data.deviceId === deviceFilter).length} of {mockHistoricalData.length} entries
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
                            <Button variant="outline" size="sm">Next</Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="trends">
                        <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
                          <div className="text-center">
                            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <h3 className="text-lg font-medium">Trends Analysis</h3>
                            <p className="text-muted-foreground max-w-md mt-2">
                              Visualize trends and patterns in your device data over time. Select devices and date ranges to analyze performance.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reports">
                        <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-lg border border-dashed">
                          <div className="text-center">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <h3 className="text-lg font-medium">Report Generation</h3>
                            <p className="text-muted-foreground max-w-md mt-2">
                              Generate custom reports for your devices and data. Select templates, date ranges, and export formats.
                            </p>
                            <Button className="mt-4" onClick={generateReport}>
                              Generate Report
                            </Button>
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
