
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock log data
const logs = [
  {
    id: "log-001",
    timestamp: "2025-05-06T09:15:23",
    level: "INFO",
    source: "Authentication Service",
    message: "User alex@example.com logged in successfully"
  },
  {
    id: "log-002",
    timestamp: "2025-05-06T09:12:05",
    level: "WARNING",
    source: "Device Gateway",
    message: "Connection attempt with invalid credentials from device DEV-003"
  },
  {
    id: "log-003",
    timestamp: "2025-05-06T08:55:17",
    level: "ERROR",
    source: "Database Service",
    message: "Failed to establish connection to replica database"
  },
  {
    id: "log-004",
    timestamp: "2025-05-06T08:45:02",
    level: "INFO",
    source: "System Monitor",
    message: "Daily system health check completed successfully"
  },
  {
    id: "log-005",
    timestamp: "2025-05-06T08:30:45",
    level: "DEBUG",
    source: "API Gateway",
    message: "Rate limiter activated for IP 203.0.113.42"
  },
  {
    id: "log-006",
    timestamp: "2025-05-06T08:25:19",
    level: "INFO",
    source: "Device Registry",
    message: "New device registered: DEV-006"
  },
  {
    id: "log-007",
    timestamp: "2025-05-06T08:15:03",
    level: "WARNING",
    source: "Message Queue",
    message: "Queue backlog detected, current depth: 1500 messages"
  },
  {
    id: "log-008",
    timestamp: "2025-05-06T07:55:34",
    level: "INFO",
    source: "Authentication Service",
    message: "Password reset requested for user taylor@example.com"
  },
  {
    id: "log-009",
    timestamp: "2025-05-06T07:45:21",
    level: "ERROR",
    source: "Storage Service",
    message: "Failed to write telemetry data to storage bucket"
  },
  {
    id: "log-010",
    timestamp: "2025-05-06T07:30:15",
    level: "INFO",
    source: "System Update",
    message: "System update scheduled for 2025-05-07T02:00:00"
  }
];

export function AdminSystemLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <div className="flex gap-2">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="INFO">Info</SelectItem>
              <SelectItem value="WARNING">Warning</SelectItem>
              <SelectItem value="ERROR">Error</SelectItem>
              <SelectItem value="DEBUG">Debug</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <div className="relative w-full overflow-auto max-h-[500px]">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b sticky top-0 bg-background">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Time
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Level
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Source
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle whitespace-nowrap">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="p-4 align-middle">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      log.level === "ERROR" ? "bg-red-50 text-red-700 ring-red-700/10" :
                      log.level === "WARNING" ? "bg-yellow-50 text-yellow-700 ring-yellow-700/10" :
                      log.level === "INFO" ? "bg-blue-50 text-blue-700 ring-blue-700/10" :
                      "bg-gray-50 text-gray-700 ring-gray-700/10"
                    }`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="p-4 align-middle">{log.source}</td>
                  <td className="p-4 align-middle">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
