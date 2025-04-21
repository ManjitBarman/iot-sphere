
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - in a real app this would come from your API
const mockTopics = [
  { 
    id: "topic-1", 
    name: "Temperature Reading", 
    topicPath: "devices/temp-001/temperature", 
    deviceId: "temp-001", 
    type: "subscribe",
    dataType: "number",
  },
  { 
    id: "topic-2", 
    name: "Humidity Control", 
    topicPath: "devices/hum-002/humidity/set", 
    deviceId: "hum-002",
    type: "publish",
    dataType: "number",
  },
  { 
    id: "topic-3", 
    name: "Light Status", 
    topicPath: "devices/light-003/status", 
    deviceId: "light-003",
    type: "subscribe",
    dataType: "boolean",
  },
];

export function TopicTable() {
  const [topics] = useState(mockTopics);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Topic Path</TableHead>
            <TableHead>Device ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Data Type</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No topics found.
              </TableCell>
            </TableRow>
          ) : (
            topics.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell className="font-medium">{topic.name}</TableCell>
                <TableCell>
                  <code className="px-2 py-1 bg-muted rounded text-sm">{topic.topicPath}</code>
                </TableCell>
                <TableCell>{topic.deviceId}</TableCell>
                <TableCell>
                  <Badge variant={topic.type === "subscribe" ? "secondary" : "outline"}>
                    {topic.type}
                  </Badge>
                </TableCell>
                <TableCell>{topic.dataType}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
