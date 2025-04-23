
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
  ArrowRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown
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
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const mockDevices = [
  { id: "temp-001", name: "Temperature Sensor", type: "Temperature", topics: ["temp/reading", "temp/status"] },
  { id: "hum-002", name: "Humidity Sensor", type: "Humidity", topics: ["humidity/level", "humidity/status"] },
  { id: "light-003", name: "Smart Light", type: "Lighting", topics: ["light/status", "light/brightness"] }
];

const mockTopics = [
  { id: "topic-1", name: "temp/reading", deviceId: "temp-001" },
  { id: "topic-2", name: "temp/status", deviceId: "temp-001" },
  { id: "topic-3", name: "humidity/level", deviceId: "hum-002" },
  { id: "topic-4", name: "humidity/status", deviceId: "hum-002" },
  { id: "topic-5", name: "light/status", deviceId: "light-003" },
  { id: "topic-6", name: "light/brightness", deviceId: "light-003" },
];

const mockData = [
  { id: 1, timestamp: "2025-04-23 09:15:00", value: 23.5, deviceId: "temp-001", topic: "temp/reading" },
  { id: 2, timestamp: "2025-04-23 09:30:00", value: 24.2, deviceId: "temp-001", topic: "temp/reading" },
  { id: 3, timestamp: "2025-04-23 09:45:00", value: 23.8, deviceId: "temp-001", topic: "temp/status" },
  { id: 4, timestamp: "2025-04-23 10:00:00", value: 45.5, deviceId: "hum-002", topic: "humidity/level" },
  { id: 5, timestamp: "2025-04-23 10:15:00", value: 46.3, deviceId: "hum-002", topic: "humidity/level" },
  { id: 6, timestamp: "2025-04-23 10:30:00", value: 47.1, deviceId: "hum-002", topic: "humidity/status" },
  { id: 7, timestamp: "2025-04-22 11:00:00", value: "ON", deviceId: "light-003", topic: "light/status" },
  { id: 8, timestamp: "2025-04-22 15:30:00", value: "OFF", deviceId: "light-003", topic: "light/status" },
  { id: 9, timestamp: "2025-04-23 09:00:00", value: 50, deviceId: "light-003", topic: "light/brightness" },
];

export default function HistoricalDataPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [valueMin, setValueMin] = useState("");
  const [valueMax, setValueMax] = useState("");
  const [timeRange, setTimeRange] = useState({ start: "", end: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Filter the available topics based on selected device
  const availableTopics = selectedDevice 
    ? mockTopics.filter(topic => topic.deviceId === selectedDevice)
    : mockTopics;

  // Apply all filters to the data
  const filteredData = mockData.filter(item => {
    // Device filter
    if (selectedDevice && item.deviceId !== selectedDevice) {
      return false;
    }
    
    // Topic filter
    if (selectedTopics.length > 0 && !selectedTopics.includes(item.topic)) {
      return false;
    }
    
    // Search query (checks device name or value)
    if (searchQuery) {
      const device = mockDevices.find(d => d.id === item.deviceId);
      const deviceName = device?.name.toLowerCase() || "";
      const itemValue = String(item.value).toLowerCase();
      const topicName = item.topic.toLowerCase();
      
      if (!deviceName.includes(searchQuery.toLowerCase()) && 
          !itemValue.includes(searchQuery.toLowerCase()) &&
          !topicName.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    
    // Value range filter for numeric values
    if (typeof item.value === 'number') {
      if (valueMin && parseFloat(valueMin) > item.value) {
        return false;
      }
      if (valueMax && parseFloat(valueMax) < item.value) {
        return false;
      }
    }
    
    // Time range filter
    if (timeRange.start && new Date(timeRange.start) > new Date(item.timestamp)) {
      return false;
    }
    if (timeRange.end && new Date(timeRange.end) < new Date(item.timestamp)) {
      return false;
    }
    
    return true;
  });

  const handleTopicToggle = (topicName: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicName)) {
        return prev.filter(t => t !== topicName);
      } else {
        return [...prev, topicName];
      }
    });
  };

  const clearFilters = () => {
    setSelectedDevice(null);
    setSelectedTopics([]);
    setSelectedDateRange("today");
    setSearchQuery("");
    setValueMin("");
    setValueMax("");
    setTimeRange({ start: "", end: "" });
  };

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId === "" ? null : deviceId);
    // Reset topics when device changes
    setSelectedTopics([]);
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: `Exporting ${filteredData.length} records to CSV file`,
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
                    <Button onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" /> Export Data
                    </Button>
                  </div>
                </div>

                <Card className="mb-6">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Data Filters</span>
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
                        <X className="h-4 w-4 mr-2" /> Clear Filters
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="device-filter">Device</Label>
                        <Select 
                          value={selectedDevice || ""} 
                          onValueChange={handleDeviceChange}
                        >
                          <SelectTrigger id="device-filter">
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
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Topics</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              <span className="truncate">
                                {selectedTopics.length === 0 
                                  ? "All topics" 
                                  : `${selectedTopics.length} selected`}
                              </span>
                              <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0" align="start">
                            <div className="p-2 border-b">
                              <div className="text-sm font-medium">Select Topics</div>
                              <div className="text-xs text-muted-foreground">
                                {availableTopics.length} topics available
                              </div>
                            </div>
                            <div className="p-2 max-h-[200px] overflow-auto">
                              {availableTopics.length === 0 ? (
                                <div className="text-center py-2 text-muted-foreground text-sm">
                                  {selectedDevice 
                                    ? "No topics available for this device"
                                    : "Select a device to see topics"}
                                </div>
                              ) : (
                                availableTopics.map(topic => (
                                  <div key={topic.id} className="flex items-center space-x-2 py-1">
                                    <Checkbox 
                                      id={topic.id} 
                                      checked={selectedTopics.includes(topic.name)}
                                      onCheckedChange={() => handleTopicToggle(topic.name)}
                                    />
                                    <label htmlFor={topic.id} className="text-sm cursor-pointer">
                                      {topic.name}
                                    </label>
                                  </div>
                                ))
                              )}
                            </div>
                            <div className="p-2 border-t flex justify-between">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedTopics([])}
                              >
                                Clear
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedTopics(availableTopics.map(t => t.name))}
                              >
                                Select All
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                          <SelectTrigger id="date-range">
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
                      </div>
                      
                      <div className="space-y-2 relative">
                        <Label htmlFor="search">Search</Label>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="search"
                            placeholder="Search in values or devices..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          {searchQuery && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="absolute right-1 top-1 h-7 w-7 p-0" 
                              onClick={() => setSearchQuery("")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center"
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                      </Button>
                    </div>
                    
                    {showFilters && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
                        <div className="space-y-2">
                          <Label>Value Range</Label>
                          <div className="flex space-x-2">
                            <div className="flex-1">
                              <Input 
                                type="number" 
                                placeholder="Min" 
                                value={valueMin}
                                onChange={(e) => setValueMin(e.target.value)}
                              />
                            </div>
                            <div className="flex-1">
                              <Input 
                                type="number" 
                                placeholder="Max" 
                                value={valueMax}
                                onChange={(e) => setValueMax(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Custom Time Range</Label>
                          <div className="flex space-x-2">
                            <Input 
                              type="datetime-local" 
                              value={timeRange.start}
                              onChange={(e) => setTimeRange({...timeRange, start: e.target.value})}
                            />
                            <span className="flex items-center text-muted-foreground">to</span>
                            <Input 
                              type="datetime-local" 
                              value={timeRange.end}
                              onChange={(e) => setTimeRange({...timeRange, end: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-end">
                          <Button className="ml-auto" onClick={() => {
                            toast({
                              title: "Filters Applied",
                              description: "Data filtered according to your criteria",
                            });
                          }}>
                            <Filter className="mr-2 h-4 w-4" /> Apply Filters
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Historical Data</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        Showing {filteredData.length} records
                      </span>
                    </CardTitle>
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
                                <TableHead>Topic</TableHead>
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
                                      <TableCell>{item.topic}</TableCell>
                                      <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                  );
                                })
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <div className="text-sm text-muted-foreground">
                            Page 1 of 1
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
                            <Button variant="outline" size="sm">Next</Button>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="chart">
                        <div className="h-80 flex items-center justify-center border rounded-md p-4">
                          <div className="text-muted-foreground">
                            <LineChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                            <p className="text-center">
                              {filteredData.length > 0 ? (
                                "Chart visualization will be implemented here"
                              ) : (
                                "No data available for visualization"
                              )}
                            </p>
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
