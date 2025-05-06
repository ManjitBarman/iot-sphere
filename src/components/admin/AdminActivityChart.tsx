
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { name: "May 1", "Data Transfers": 4000, "Active Users": 2400, "Device Registrations": 2400 },
  { name: "May 5", "Data Transfers": 3000, "Active Users": 1398, "Device Registrations": 2210 },
  { name: "May 10", "Data Transfers": 2000, "Active Users": 9800, "Device Registrations": 2290 },
  { name: "May 15", "Data Transfers": 2780, "Active Users": 3908, "Device Registrations": 2000 },
  { name: "May 20", "Data Transfers": 1890, "Active Users": 4800, "Device Registrations": 2181 },
  { name: "May 25", "Data Transfers": 2390, "Active Users": 3800, "Device Registrations": 2500 },
  { name: "May 30", "Data Transfers": 3490, "Active Users": 4300, "Device Registrations": 2100 },
];

export function AdminActivityChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Active Users"
            stackId="1"
            stroke="#0070f3"
            fill="#0070f3"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="Data Transfers"
            stackId="2"
            stroke="#00a2ff"
            fill="#00a2ff"
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="Device Registrations"
            stackId="3"
            stroke="#00d5bd"
            fill="#00d5bd"
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
