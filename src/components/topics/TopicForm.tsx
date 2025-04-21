
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - in a real app this would come from your API
const mockDevices = [
  { id: "temp-001", name: "Temperature Sensor" },
  { id: "hum-002", name: "Humidity Control" },
  { id: "light-003", name: "Smart Light" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  deviceId: z.string().min(1, "Please select a device."),
  topicPath: z.string().min(3, "Topic path must be at least 3 characters."),
  type: z.enum(["publish", "subscribe"]),
  dataType: z.enum(["string", "number", "boolean", "json"]),
});

export function TopicForm({ onSubmit }: { onSubmit: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [devices] = useState(mockDevices);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      deviceId: "",
      topicPath: "",
      type: "subscribe",
      dataType: "string",
    },
  });

  // Update topic path when device is selected
  const selectedDeviceId = form.watch("deviceId");
  const topicType = form.watch("type");

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Here you would typically send the data to your API
    console.log("Form submitted:", values);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Name</FormLabel>
              <FormControl>
                <Input placeholder="Temperature Reading" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topicPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic Path</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    selectedDeviceId 
                      ? `devices/${selectedDeviceId}/${topicType === 'publish' ? 'command' : 'data'}`
                      : "Enter topic path"
                  }
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="subscribe">Subscribe (Receive Data)</SelectItem>
                  <SelectItem value="publish">Publish (Send Commands)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Topic"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
