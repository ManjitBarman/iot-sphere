
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, ChevronDown, Layout } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Sample dashboards - in a real app, these would come from an API or context
const sampleDashboards = [
  { id: "main", name: "Main Dashboard", path: "/dashboard" },
  { id: "device-1", name: "Temperature Sensors", path: "/dashboard/device-1" },
  { id: "device-2", name: "Humidity Monitors", path: "/dashboard/device-2" },
  { id: "power", name: "Power Consumption", path: "/dashboard/power" },
  { id: "alerts", name: "Alert System", path: "/dashboard/alerts" },
];

interface DashboardSwitcherProps {
  currentDashboardId?: string;
}

const DashboardSwitcher = ({ currentDashboardId: propDashboardId }: DashboardSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { dashboardId } = useParams();
  
  // Determine the current dashboard ID from URL params or prop
  const currentDashboardId = dashboardId || propDashboardId || "main";
  
  const currentDashboard = sampleDashboards.find(
    (dashboard) => dashboard.id === currentDashboardId
  ) || sampleDashboards.find(
    (dashboard) => dashboard.path === `/dashboard/${currentDashboardId}`
  ) || sampleDashboards[0];

  const handleSelect = (dashboardId: string) => {
    const dashboard = sampleDashboards.find((d) => d.id === dashboardId);
    if (dashboard) {
      navigate(dashboard.path);
      toast({
        title: "Dashboard Changed",
        description: `Switched to ${dashboard.name}`,
      });
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="max-w-[220px] justify-between overflow-hidden"
        >
          <Layout className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">{currentDashboard.name}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search dashboards..." />
          <CommandList>
            <CommandEmpty>No dashboards found.</CommandEmpty>
            <CommandGroup heading="Dashboards">
              {sampleDashboards.map((dashboard) => (
                <CommandItem
                  key={dashboard.id}
                  value={dashboard.id}
                  onSelect={() => handleSelect(dashboard.id)}
                  className="cursor-pointer"
                >
                  <Layout className="mr-2 h-4 w-4" />
                  <span>{dashboard.name}</span>
                  {(dashboard.id === currentDashboardId || 
                   dashboard.path === `/dashboard/${currentDashboardId}`) && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DashboardSwitcher;
