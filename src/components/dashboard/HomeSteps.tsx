
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, "mqtt-topics", "view-dashboards" } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeSteps() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Step 1: Create Devices */}
      <Card className="border-2 border-blue-200 shadow-none">
        <CardContent className="pt-6 pb-8">
          <div className="flex items-center mb-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mr-2">1</span>
            <h2 className="text-lg font-bold">Create Devices</h2>
          </div>
          <div className="text-muted-foreground text-sm mb-2">Register your IoT devices</div>
          <div className="text-sm mb-6">Add your physical devices to monitor and control them through the platform.</div>
          <Button className="w-full" onClick={() => navigate("/devices")}>
            <Plus className="mr-2" /> Create Devices
          </Button>
        </CardContent>
      </Card>
      {/* Step 2: Configure MQTT Topics */}
      <Card className="border-2 border-blue-200 shadow-none">
        <CardContent className="pt-6 pb-8">
          <div className="flex items-center mb-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mr-2">2</span>
            <h2 className="text-lg font-bold">Configure MQTT Topics</h2>
          </div>
          <div className="text-muted-foreground text-sm mb-2">Set up data channels</div>
          <div className="text-sm mb-6">Define MQTT topics for your devices to publish and subscribe to data.</div>
          <Button className="w-full" variant="secondary" onClick={() => navigate("/devices")}>
            <mqtt-topics className="mr-2" /> Configure Topics
          </Button>
        </CardContent>
      </Card>
      {/* Step 3: Create Dashboards */}
      <Card className="border-2 border-blue-200 shadow-none">
        <CardContent className="pt-6 pb-8">
          <div className="flex items-center mb-2">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mr-2">3</span>
            <h2 className="text-lg font-bold">Create Dashboards</h2>
          </div>
          <div className="text-muted-foreground text-sm mb-2">Visualize your data</div>
          <div className="text-sm mb-6">Build custom dashboards with widgets to monitor your devices in real-time.</div>
          <Button className="w-full" variant="secondary" onClick={() => navigate("/dashboards")}>
            <view-dashboards className="mr-2" /> Create Dashboards
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
