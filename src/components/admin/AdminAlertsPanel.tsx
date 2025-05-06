
import React from "react";
import { Bell, Info, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "info" | "warning" | "critical";
type Alert = {
  id: string;
  type: AlertType;
  message: string;
  source: string;
  time: string;
};

const alerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "Database reaching storage limit (85% used)",
    source: "Database Server",
    time: "10 minutes ago"
  },
  {
    id: "2",
    type: "warning",
    message: "Device authentication failures detected",
    source: "Security System",
    time: "1 hour ago"
  },
  {
    id: "3",
    type: "warning",
    message: "High CPU usage on API server",
    source: "System Monitor",
    time: "3 hours ago"
  },
  {
    id: "4",
    type: "info",
    message: "5 new devices registered",
    source: "Device Registry",
    time: "5 hours ago"
  },
  {
    id: "5",
    type: "info",
    message: "System backup completed successfully",
    source: "Backup Service",
    time: "6 hours ago"
  },
  {
    id: "6",
    type: "warning",
    message: "Unusual traffic pattern detected",
    source: "Network Monitor",
    time: "8 hours ago"
  },
  {
    id: "7",
    type: "critical",
    message: "Gateway 3 connectivity issues",
    source: "Network Infrastructure",
    time: "12 hours ago"
  },
  {
    id: "8",
    type: "info",
    message: "System update available",
    source: "Update Service",
    time: "1 day ago"
  }
];

interface AdminAlertsPanelProps {
  limit?: number;
}

export function AdminAlertsPanel({ limit }: AdminAlertsPanelProps) {
  const displayAlerts = limit ? alerts.slice(0, limit) : alerts;
  
  return (
    <div className="space-y-4">
      {displayAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No alerts</h3>
          <p className="text-sm text-muted-foreground">
            When there are alerts, they will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-4 rounded-lg p-3",
                alert.type === "critical" ? "bg-red-500/10" :
                alert.type === "warning" ? "bg-amber-500/10" :
                "bg-blue-500/10"
              )}
            >
              <div className="mt-0.5">
                {alert.type === "critical" ? (
                  <AlertOctagon className={cn(
                    "h-5 w-5",
                    "text-red-500"
                  )} />
                ) : alert.type === "warning" ? (
                  <AlertTriangle className={cn(
                    "h-5 w-5",
                    "text-amber-500"
                  )} />
                ) : (
                  <Info className={cn(
                    "h-5 w-5",
                    "text-blue-500"
                  )} />
                )}
              </div>
              <div className="space-y-1">
                <p className={cn(
                  "font-medium leading-none",
                  alert.type === "critical" ? "text-red-500" :
                  alert.type === "warning" ? "text-amber-500" :
                  "text-blue-500"
                )}>
                  {alert.message}
                </p>
                <div className="flex text-xs text-muted-foreground">
                  <p>{alert.source}</p>
                  <span className="mx-1">•</span>
                  <p>{alert.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
