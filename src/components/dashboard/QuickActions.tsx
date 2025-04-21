
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { "devices", "mqtt-topics", "view-dashboards" } from "lucide-react";
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
            <devices className="mr-2" /> Manage Devices
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/devices")}
          >
            <mqtt-topics className="mr-2" /> Manage MQTT Topics
          </Button>
          <Button
            variant="outline"
            className="w-full flex justify-start items-center gap-2"
            onClick={() => navigate("/dashboards")}
          >
            <view-dashboards className="mr-2" /> View Dashboards
          </Button>
        </div>
      </div>
    </Card>
  );
}
