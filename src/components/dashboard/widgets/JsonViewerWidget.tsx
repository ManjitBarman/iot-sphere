
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JsonViewerWidgetProps {
  data: any;
}

export function JsonViewerWidget({ data }: JsonViewerWidgetProps) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "JSON data has been copied to clipboard."
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4 mr-1" /> Copy
        </Button>
      </div>
      <div className="overflow-auto flex-1 rounded-md border bg-muted p-4">
        <pre className="text-xs">
          {JSON.stringify(data, null, expanded ? 2 : 0)}
        </pre>
      </div>
    </div>
  );
}
