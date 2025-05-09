
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Download, 
  LineChart, 
  FileText, 
  Filter,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  BarChart,
  BarChart3,
  Share2,
  Printer,
  Clock,
  CalendarDays,
  SaveAll,
  TrashIcon,
  PanelRightClose
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  const [activeView, setActiveView] = useState("table");
  const [currentTab, setCurrentTab] = useState("data");
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

  const handleSaveView = () => {
    toast({
      title: "View Saved",
      description: "Current view configuration has been saved",
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
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold flex items-center gap-2">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        Historical Data
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        View and analyze historical device data over time
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={handleSaveView}>
                        <SaveAll className="mr-2 h-4 w-4" />
                        Save View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate("/analytics/reports")}>
                        <FileText className="mr-2 h-4 w-4" />
                        Reports
                      </Button>
                      <Button size="sm" onClick={handleExportData}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="data" className="data-tab">
                        <FileText className="mr-2 h-4 w-4" />
                        Data
                      </TabsTrigger>
                      <TabsTrigger value="visualization">
                        <BarChart className="mr-2 h-4 w-4" />
                        Visualization
                      </TabsTrigger>
                      <TabsTrigger value="analytics">
                        <LineChart className="mr-2 h-4 w-4" />
                        Analytics
                      </TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                      <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                        <SelectTrigger className="w-[180px]">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="last7days">Last 7 Days</SelectItem>
                          <SelectItem value="last30days">Last 30 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)} 
                          className="w-[200px] pl-9"
                        />
                        {searchQuery && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0" 
                            onClick={() => setSearchQuery("")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <TabsContent value="data" className="space-y-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-3 mb-6">
                          <Select value={selectedDevice || ""} onValueChange={handleDeviceChange}>
                            <SelectTrigger className="w-[200px]">
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

                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="flex justify-between min-w-[200px]">
                                <span>
                                  {selectedTopics.length === 0 
                                    ? "All topics" 
                                    : `${selectedTopics.length} topics`}
                                </span>
                                <ChevronDown className="h-4 w-4 ml-2" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0" align="start">
                              <div className="p-2 border-b">
                                <h4 className="font-medium text-sm">Select Topics</h4>
                                <p className="text-xs text-muted-foreground">
                                  {availableTopics.length} topics available
                                </p>
                              </div>
                              <div className="p-2 max-h-[200px] overflow-auto">
                                {availableTopics.length === 0 ? (
                                  <div className="text-muted-foreground text-center py-4">
                                    {selectedDevice ? "No topics for this device" : "Select a device to see topics"}
                                  </div>
                                ) : (
                                  availableTopics.map(topic => (
                                    <div key={topic.id} className="flex items-center space-x-2 py-1.5">
                                      <Checkbox 
                                        id={topic.id} 
                                        checked={selectedTopics.includes(topic.name)}
                                        onCheckedChange={() => handleTopicToggle(topic.name)}
                                      />
                                      <label 
                                        htmlFor={topic.id} 
                                        className="text-sm cursor-pointer flex-1 truncate"
                                      >
                                        {topic.name}
                                      </label>
                                    </div>
                                  ))
                                )}
                              </div>
                              <div className="border-t p-2 flex justify-between">
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

                          <Button 
                            variant={showFilters ? "default" : "outline"} 
                            size="default" 
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center ${showFilters ? 'bg-primary' : ''}`}
                          >
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            {showFilters ? "Hide Filters" : "Advanced Filters"}
                          </Button>

                          {(selectedDevice || selectedTopics.length > 0 || valueMin || valueMax || timeRange.start || timeRange.end) && (
                            <Button 
                              variant="ghost" 
                              className="border border-dashed"
                              onClick={clearFilters}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Clear All Filters
                            </Button>
                          )}
                        </div>

                        {showFilters && (
                          <div className="mb-6 p-4 border rounded-md bg-muted/10">
                            <h3 className="text-sm font-medium mb-4">Advanced Filters</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Value Range</Label>
                                <div className="flex space-x-2">
                                  <div className="w-full">
                                    <Input 
                                      type="number" 
                                      placeholder="Min" 
                                      value={valueMin}
                                      onChange={(e) => setValueMin(e.target.value)}
                                    />
                                  </div>
                                  <div className="w-full">
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
                                <div className="grid grid-cols-2 gap-2">
                                  <Input 
                                    type="datetime-local" 
                                    value={timeRange.start}
                                    onChange={(e) => setTimeRange({...timeRange, start: e.target.value})}
                                    placeholder="From"
                                  />
                                  <Input 
                                    type="datetime-local" 
                                    value={timeRange.end}
                                    onChange={(e) => setTimeRange({...timeRange, end: e.target.value})}
                                    placeholder="To"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Active filters */}
                        {(selectedDevice || selectedTopics.length > 0 || valueMin || valueMax || timeRange.start || timeRange.end) && (
                          <div className="mb-4">
                            <div className="text-sm text-muted-foreground mb-2">Active Filters:</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedDevice && (
                                <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                                  Device: {mockDevices.find(d => d.id === selectedDevice)?.name}
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setSelectedDevice(null)}
                                    className="h-4 w-4 p-0 ml-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              )}
                              
                              {selectedTopics.length > 0 && (
                                <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                                  Topics: {selectedTopics.length}
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setSelectedTopics([])}
                                    className="h-4 w-4 p-0 ml-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              )}
                              
                              {(valueMin || valueMax) && (
                                <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                                  Value: {valueMin || '∞'} - {valueMax || '∞'}
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => { setValueMin(''); setValueMax(''); }}
                                    className="h-4 w-4 p-0 ml-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              )}
                              
                              {(timeRange.start || timeRange.end) && (
                                <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                                  Time: {timeRange.start ? new Date(timeRange.start).toLocaleDateString() : '∞'} - 
                                  {timeRange.end ? new Date(timeRange.end).toLocaleDateString() : '∞'}
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setTimeRange({ start: '', end: '' })}
                                    className="h-4 w-4 p-0 ml-1"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <Tabs defaultValue={activeView} onValueChange={setActiveView} className="w-full">
                          <div className="flex items-center justify-between mb-4">
                            <TabsList className="w-auto">
                              <TabsTrigger value="table" className="px-3 py-1.5">
                                <FileText className="mr-2 h-4 w-4" /> Table
                              </TabsTrigger>
                              <TabsTrigger value="card" className="px-3 py-1.5">
                                <PanelRightClose className="mr-2 h-4 w-4" /> Card
                              </TabsTrigger>
                            </TabsList>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => toast({ title: "Sharing options", description: "Share configuration opened" })}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => window.print()}>
                                <Printer className="mr-2 h-4 w-4" />
                                Print
                              </Button>
                            </div>
                          </div>

                          <TabsContent value="table" className="mt-0">
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
                                        <TableRow key={item.id} className="cursor-pointer hover:bg-muted/40">
                                          <TableCell className="font-mono text-xs">{item.timestamp}</TableCell>
                                          <TableCell>{device?.name || item.deviceId}</TableCell>
                                          <TableCell className="font-mono text-xs">{item.topic}</TableCell>
                                          <TableCell className="font-semibold">{item.value}</TableCell>
                                        </TableRow>
                                      );
                                    })
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <div className="text-sm text-muted-foreground">
                                Showing {filteredData.length} of {mockData.length} records
                              </div>
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" disabled>Previous</Button>
                                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
                                <Button variant="outline" size="sm">Next</Button>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="card" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredData.length === 0 ? (
                                <div className="md:col-span-2 text-center py-12 border rounded-md bg-muted/10">
                                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-2" />
                                  <p className="text-muted-foreground">No data available for the selected filters.</p>
                                </div>
                              ) : (
                                filteredData.map((item) => {
                                  const device = mockDevices.find(d => d.id === item.deviceId);
                                  return (
                                    <Card key={item.id} className="overflow-hidden">
                                      <CardHeader className="bg-muted/30 pb-2 pt-3">
                                        <div className="flex justify-between">
                                          <div>
                                            <Badge variant="outline">{device?.name || item.deviceId}</Badge>
                                            <div className="text-xs text-muted-foreground mt-1 font-mono">
                                              {item.topic}
                                            </div>
                                          </div>
                                          <Badge 
                                            variant={typeof item.value === 'number' ? "default" : "outline"}
                                            className={typeof item.value === 'number' ? "bg-blue-500" : ""}
                                          >
                                            {typeof item.value === 'number' ? "Numeric" : "String"}
                                          </Badge>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                          <div className="text-xl font-bold">{item.value}</div>
                                          <div className="text-muted-foreground text-xs font-mono">
                                            {new Date(item.timestamp).toLocaleString()}
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="visualization">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Data Visualization</CardTitle>
                        <CardDescription>
                          Visual representation of your historical data
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/10">
                          <div className="text-center p-6">
                            <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-3 opacity-40" />
                            <h3 className="text-lg font-medium">Data Visualization</h3>
                            <p className="text-muted-foreground max-w-md mt-2">
                              Select data points and visualization type to generate charts and graphs of your IoT data.
                            </p>
                            <div className="flex gap-3 mt-6 justify-center">
                              <Button>
                                <LineChart className="mr-2 h-4 w-4" />
                                Line Chart
                              </Button>
                              <Button variant="outline">
                                <BarChart className="mr-2 h-4 w-4" />
                                Bar Chart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Data Analytics</CardTitle>
                        <CardDescription>
                          Advanced analytics and insights from your data
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/10">
                          <div className="text-center p-6">
                            <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-3 opacity-40" />
                            <h3 className="text-lg font-medium">Analytics Engine</h3>
                            <p className="text-muted-foreground max-w-md mt-2">
                              Apply advanced analytics to your IoT data to identify patterns, anomalies, and trends.
                            </p>
                            <Button className="mt-6">
                              Generate Analytics
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
