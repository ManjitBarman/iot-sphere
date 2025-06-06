
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, LayoutDashboard, Database, BarChart3, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="mb-6 p-0">
      <div className="px-6 pt-6 pb-3">
        <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/devices")}
          >
            <Cpu className="mr-2" /> Manage Devices
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/devices")}
          >
            <Database className="mr-2" /> Manage MQTT Topics
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/dashboards")}
          >
            <LayoutDashboard className="mr-2" /> View Dashboards
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/analytics/historical")}
          >
            <CalendarDays className="mr-2" /> Historical Data
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/analytics/reports")}
          >
            <BarChart3 className="mr-2" /> Generate Reports
          </Button>
        </div>
      </div>
    </Card>
  );
}
