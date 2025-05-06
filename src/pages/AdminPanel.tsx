
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  ShieldAlert, 
  Cpu, 
  Bell, 
  Settings, 
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { AdminDevicesTable } from "@/components/admin/AdminDevicesTable";
import { AdminSystemLogs } from "@/components/admin/AdminSystemLogs";
import { AdminOverviewStats } from "@/components/admin/AdminOverviewStats";
import { AdminActivityChart } from "@/components/admin/AdminActivityChart";
import { AdminAlertsPanel } from "@/components/admin/AdminAlertsPanel";
import { AdminSettingsForm } from "@/components/admin/AdminSettingsForm";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={sidebarOpen} open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader editMode={false} setEditMode={() => {}} />
            <main className="flex-1 p-6 overflow-auto bg-muted/20">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your IoT platform and monitor system performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      className="w-full md:w-[250px]" 
                      placeholder="Search..." 
                    />
                    <Button>
                      Search
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="hidden md:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="users" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="hidden md:inline">Users</span>
                    </TabsTrigger>
                    <TabsTrigger value="devices" className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      <span className="hidden md:inline">Devices</span>
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="hidden md:inline">System Logs</span>
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span className="hidden md:inline">Alerts</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span className="hidden md:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="hidden md:inline">Settings</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <AdminOverviewStats />
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>System Activity</CardTitle>
                          <CardDescription>Platform usage over the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <AdminActivityChart />
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Alerts</CardTitle>
                          <CardDescription>Latest system notifications</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <AdminAlertsPanel limit={5} />
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <TabsTrigger value="alerts">View All Alerts</TabsTrigger>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="users" className="space-y-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>User Management</CardTitle>
                          <CardDescription>Manage user accounts and permissions</CardDescription>
                        </div>
                        <Button>Add User</Button>
                      </CardHeader>
                      <CardContent>
                        <AdminUserTable />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="devices" className="space-y-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Device Management</CardTitle>
                          <CardDescription>Monitor and manage connected IoT devices</CardDescription>
                        </div>
                        <Button>Register Device</Button>
                      </CardHeader>
                      <CardContent>
                        <AdminDevicesTable />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="logs" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>System Logs</CardTitle>
                        <CardDescription>Review system activities and events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdminSystemLogs />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="alerts" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Alert Management</CardTitle>
                        <CardDescription>Configure and review system alerts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdminAlertsPanel />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage platform security configurations</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <h3 className="text-lg font-medium">Authentication</h3>
                            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                              <div>
                                <h4 className="font-medium">Two-Factor Authentication</h4>
                                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                              </div>
                              <Button variant="outline">Configure</Button>
                            </div>
                            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                              <div>
                                <h4 className="font-medium">Password Policy</h4>
                                <p className="text-sm text-muted-foreground">Set password requirements</p>
                              </div>
                              <Button variant="outline">Configure</Button>
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <h3 className="text-lg font-medium">Access Control</h3>
                            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                              <div>
                                <h4 className="font-medium">IP Allowlist</h4>
                                <p className="text-sm text-muted-foreground">Restrict access by IP address</p>
                              </div>
                              <Button variant="outline">Configure</Button>
                            </div>
                            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                              <div>
                                <h4 className="font-medium">Role Management</h4>
                                <p className="text-sm text-muted-foreground">Define user roles and permissions</p>
                              </div>
                              <Button variant="outline">Configure</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Settings</CardTitle>
                        <CardDescription>Configure global system settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AdminSettingsForm />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
