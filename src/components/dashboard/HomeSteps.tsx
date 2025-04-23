
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Database, LayoutDashboard, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeSteps() {
  const navigate = useNavigate();

  return (
    <div className="relative mb-8">
      {/* Roadmap connecting line */}
      <div className="absolute left-[3.5rem] top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-primary to-primary/30 hidden md:block" />
      
      <div className="grid grid-cols-1 gap-8">
        {/* Step 1: Create Devices */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-xl border border-primary/30">
            <span className="text-2xl font-bold text-primary">1</span>
          </div>
          <Card className="flex-grow border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                Create Devices 
                <ArrowRight className="h-4 w-4 text-primary" />
              </h2>
              <div className="text-muted-foreground text-sm mb-2">First step: Register your IoT hardware</div>
              <div className="text-sm mb-6 border-l-4 border-primary/30 pl-3 py-2 bg-muted/20">
                Add your physical devices to the platform by entering their details and connection parameters. 
                This enables monitoring and control through MQTT protocol.
              </div>
              <Button className="w-full sm:w-auto group" onClick={() => navigate("/devices")}>
                <Plus className="mr-2 group-hover:animate-pulse" /> Create Your First Device
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step 2: Configure MQTT Topics */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-xl border border-primary/30">
            <span className="text-2xl font-bold text-primary">2</span>
          </div>
          <Card className="flex-grow border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                Configure MQTT Topics
                <ArrowRight className="h-4 w-4 text-primary" />
              </h2>
              <div className="text-muted-foreground text-sm mb-2">Second step: Set up data channels for your devices</div>
              <div className="text-sm mb-6 border-l-4 border-primary/30 pl-3 py-2 bg-muted/20">
                Define the MQTT topics that your devices will use to publish and subscribe to data. 
                These act as communication channels between your devices and the platform.
                Format: <span className="font-mono text-xs bg-primary/10 px-1 py-0.5 rounded">your-org/device-id/measurement-type</span>
              </div>
              <Button className="w-full sm:w-auto group" variant="secondary" onClick={() => navigate("/devices")}>
                <Database className="mr-2 group-hover:animate-pulse" /> Set Up Your Topics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Step 3: Create Dashboards */}
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shadow-xl border border-primary/30">
            <span className="text-2xl font-bold text-primary">3</span>
          </div>
          <Card className="flex-grow border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="pt-6 pb-8">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                Create Dashboards
                <ArrowRight className="h-4 w-4 text-primary" />
              </h2>
              <div className="text-muted-foreground text-sm mb-2">Final step: Visualize your IoT data</div>
              <div className="text-sm mb-6 border-l-4 border-primary/30 pl-3 py-2 bg-muted/20">
                Create custom dashboards with widgets to monitor your devices in real-time. 
                Drag and drop widgets, resize them, and arrange them to suit your needs.
                Enable auto-format for instant layout optimization.
              </div>
              <Button className="w-full sm:w-auto group" variant="secondary" onClick={() => navigate("/dashboards")}>
                <LayoutDashboard className="mr-2 group-hover:animate-pulse" /> Build Your Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
