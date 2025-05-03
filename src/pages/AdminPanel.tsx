
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
              <div className="max-w-6xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="devices">Device Management</TabsTrigger>
                    <TabsTrigger value="logs">System Logs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">120</div>
                          <p className="text-xs text-muted-foreground">+10% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">450</div>
                          <p className="text-xs text-muted-foreground">+5% from last week</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Data Transfer</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">2.4 TB</div>
                          <p className="text-xs text-muted-foreground">+12% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">System Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-500">Healthy</div>
                          <p className="text-xs text-muted-foreground">All systems operational</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="users" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">User management table will be implemented here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="devices" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Device Management</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Device management interface will be implemented here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="logs" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>System Logs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">System logs and monitoring interface will be implemented here.</p>
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
