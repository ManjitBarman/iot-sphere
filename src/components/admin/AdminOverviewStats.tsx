
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Cpu, Database, AlertTriangle } from "lucide-react";

export function AdminOverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">124</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+12%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">458</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+5%</span>
            <span className="ml-1">from last week</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2.4 TB</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
            <span className="text-emerald-500 font-medium">+12%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
            <span className="text-red-500 font-medium">+3</span>
            <span className="ml-1">since yesterday</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
