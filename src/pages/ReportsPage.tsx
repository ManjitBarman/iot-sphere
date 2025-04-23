import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Calendar, 
  PieChart, 
  BarChart, 
  FileSpreadsheet, 
  File, 
  Send,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reportTemplates = [
  {
    id: "temp-report",
    name: "Temperature Summary",
    description: "Daily, weekly, or monthly temperature readings with min/max/avg values",
    type: "summary",
    icon: <BarChart className="h-10 w-10 text-primary/70" />,
  },
  {
    id: "device-usage",
    name: "Device Usage Report",
    description: "Shows on/off patterns and total usage time for devices",
    type: "usage",
    icon: <PieChart className="h-10 w-10 text-primary/70" />,
  },
  {
    id: "anomaly-report",
    name: "Anomaly Detection",
    description: "Highlights unusual patterns in device behavior",
    type: "anomaly",
    icon: <FileText className="h-10 w-10 text-primary/70" />,
  },
];

const savedReports = [
  {
    id: "report-1",
    name: "Monthly Temperature Report",
    createdAt: "2025-04-01",
    format: "pdf",
    scheduled: false,
  },
  {
    id: "report-2",
    name: "Weekly Device Usage",
    createdAt: "2025-04-15",
    format: "excel",
    scheduled: true,
  },
];

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewReport, setShowNewReport] = useState(false);
  const [reportName, setReportName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [reportFormat, setReportFormat] = useState("pdf");
  const { toast } = useToast();

  const handleCreateReport = () => {
    if (!reportName || !selectedTemplate) {
      toast({
        title: "Missing Information",
        description: "Please provide a report name and select a template",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would create the report
    toast({
      title: "Report Created",
      description: "Your report has been generated successfully",
    });
    setShowNewReport(false);
  };

  const handleScheduleReport = (reportId: string) => {
    toast({
      title: "Report Scheduled",
      description: "Your report has been scheduled for weekly delivery",
    });
  };

  const handleDownloadReport = (reportId: string, format: string) => {
    toast({
      title: "Report Downloaded",
      description: `Your report has been downloaded in ${format.toUpperCase()} format`,
    });
  };

  const handleEmailReport = (reportId: string) => {
    toast({
      title: "Report Sent",
      description: "Your report has been emailed to your account",
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
                      Reports
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Generate and manage device data reports
                    </p>
                  </div>
                  <Dialog open={showNewReport} onOpenChange={setShowNewReport}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create New Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Report</DialogTitle>
                        <DialogDescription>
                          Generate a new report based on your device data
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="report-name">Report Name</Label>
                          <Input 
                            id="report-name" 
                            value={reportName}
                            onChange={(e) => setReportName(e.target.value)}
                            placeholder="Enter report name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="report-template">Report Template</Label>
                          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <SelectTrigger id="report-template">
                              <SelectValue placeholder="Select a report template" />
                            </SelectTrigger>
                            <SelectContent>
                              {reportTemplates.map(template => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="report-format">Report Format</Label>
                          <Select value={reportFormat} onValueChange={setReportFormat}>
                            <SelectTrigger id="report-format">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF Document</SelectItem>
                              <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                              <SelectItem value="csv">CSV File</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowNewReport(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateReport}>Generate Report</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Tabs defaultValue="templates">
                  <TabsList className="mb-6">
                    <TabsTrigger value="templates">Report Templates</TabsTrigger>
                    <TabsTrigger value="saved">Saved Reports</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
                  </TabsList>

                  <TabsContent value="templates">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {reportTemplates.map((template) => (
                        <Card key={template.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex justify-center mb-2">
                              {template.icon}
                            </div>
                            <CardTitle>{template.name}</CardTitle>
                            <CardDescription>{template.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full" onClick={() => {
                              setReportName(template.name);
                              setSelectedTemplate(template.id);
                              setShowNewReport(true);
                            }}>
                              Generate Report
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="saved">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedReports.map((report) => (
                        <Card key={report.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center">
                                {report.format === 'pdf' ? (
                                  <File className="h-5 w-5 mr-2 text-primary" />
                                ) : (
                                  <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
                                )}
                                {report.name}
                              </CardTitle>
                              <span className="text-xs text-muted-foreground">
                                Created: {report.createdAt}
                              </span>
                            </div>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm" onClick={() => handleEmailReport(report.id)}>
                              <Send className="h-4 w-4 mr-2" /> Email
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDownloadReport(report.id, report.format)}
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                            {!report.scheduled && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleScheduleReport(report.id)}
                              >
                                <Calendar className="h-4 w-4 mr-2" /> Schedule
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="scheduled">
                    <Card>
                      <CardHeader>
                        <CardTitle>Scheduled Reports</CardTitle>
                        <CardDescription>Reports that run on a schedule</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <table className="w-full caption-bottom text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="h-12 px-4 text-left font-medium">Report Name</th>
                                <th className="h-12 px-4 text-left font-medium">Frequency</th>
                                <th className="h-12 px-4 text-left font-medium">Next Run</th>
                                <th className="h-12 px-4 text-left font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {savedReports
                                .filter(r => r.scheduled)
                                .map(report => (
                                <tr key={report.id} className="border-b">
                                  <td className="p-4">{report.name}</td>
                                  <td className="p-4">Weekly</td>
                                  <td className="p-4">2025-04-30</td>
                                  <td className="p-4">
                                    <Button variant="ghost" size="sm">
                                      Edit Schedule
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                              {savedReports.filter(r => r.scheduled).length === 0 && (
                                <tr>
                                  <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                    No scheduled reports. Schedule a report to see it here.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
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
