
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function GettingStartedGuide() {
  return (
    <Card className="mb-6 p-0">
      <div className="px-6 pt-6 pb-6">
        <h3 className="text-xl font-semibold mb-2">Getting Started Guide</h3>
        <div className="mb-5 text-muted-foreground text-sm">
          New to IoT? Follow our step-by-step guide to set up your first connected device.
        </div>
        <Button className="w-full">
          View Guide <ArrowRight className="ml-2" />
        </Button>
      </div>
    </Card>
  );
}
