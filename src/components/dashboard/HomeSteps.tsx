
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeSteps() {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8">
      {/* Connecting line between steps */}
      <div className="absolute left-[3.5rem] top-12 bottom-12 w-0.5 bg-blue-200 hidden md:block" />
      
      <div className="grid grid-cols-1 gap-8">
        {/* Step 1: Create Devices */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">1</span>
          </div>
          <Card className="flex-grow border-2 border-blue-200 shadow-none">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2">Create Devices</h2>
              <div className="text-muted-foreground text-sm mb-2">Register your IoT devices</div>
              <div className="text-sm mb-6">Add your physical devices to monitor and control them through the platform.</div>
              <Button className="w-full sm:w-auto" onClick={() => navigate("/devices")}>
                <Plus className="mr-2" /> Create Devices
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step 2: Configure MQTT Topics */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">2</span>
          </div>
          <Card className="flex-grow border-2 border-blue-200 shadow-none">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2">Configure MQTT Topics</h2>
              <div className="text-muted-foreground text-sm mb-2">Set up data channels</div>
              <div className="text-sm mb-6">Define MQTT topics for your devices to publish and subscribe to data.</div>
              <Button className="w-full sm:w-auto" variant="secondary" onClick={() => navigate("/devices")}>
                <Database className="mr-2" /> Configure Topics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step 3: Create Dashboards */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">3</span>
          </div>
          <Card className="flex-grow border-2 border-blue-200 shadow-none">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2">Create Dashboards</h2>
              <div className="text-muted-foreground text-sm mb-2">Visualize your data</div>
              <div className="text-sm mb-6">Build custom dashboards with widgets to monitor your devices in real-time.</div>
              <Button className="w-full sm:w-auto" variant="secondary" onClick={() => navigate("/dashboards")}>
                <LayoutDashboard className="mr-2" /> Create Dashboards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
