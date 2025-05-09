
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
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Step 1: Connectivity form schema
const connectivitySchema = z.object({
  connectivity: z.enum(["mqtt", "http"]),
});

// Step 2: Device details form schema
const deviceDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  deviceId: z.string().min(3, "Device ID must be at least 3 characters."),
  type: z.enum(["sensor", "actuator", "gateway"]),
  description: z.string().optional(),
});

// For MQTT specific settings
const mqttSettingsSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  qos: z.enum(["0", "1", "2"]),
});

// For HTTP specific settings
const httpSettingsSchema = z.object({
  endpoint: z.string().url("Must be a valid URL"),
  method: z.enum(["GET", "POST"]),
});

export function DeviceForm({ onSubmit }: { onSubmit: () => void }) {
  const [currentStep, setCurrentStep] = useState<'connectivity' | 'details'>('connectivity');
  const [selectedConnectivity, setSelectedConnectivity] = useState<'mqtt' | 'http' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Connectivity form
  const connectivityForm = useForm<z.infer<typeof connectivitySchema>>({
    resolver: zodResolver(connectivitySchema),
    defaultValues: {
      connectivity: undefined,
    },
  });

  // Step 2: Device details form
  const deviceForm = useForm<z.infer<typeof deviceDetailsSchema>>({
    resolver: zodResolver(deviceDetailsSchema),
    defaultValues: {
      name: "",
      deviceId: "",
      type: "sensor",
      description: "",
    },
  });

  // MQTT specific form
  const mqttForm = useForm<z.infer<typeof mqttSettingsSchema>>({
    resolver: zodResolver(mqttSettingsSchema),
    defaultValues: {
      topic: "",
      qos: "0",
    },
  });

  // HTTP specific form
  const httpForm = useForm<z.infer<typeof httpSettingsSchema>>({
    resolver: zodResolver(httpSettingsSchema),
    defaultValues: {
      endpoint: "https://",
      method: "GET",
    },
  });

  function handleConnectivitySubmit(values: z.infer<typeof connectivitySchema>) {
    setSelectedConnectivity(values.connectivity);
    setCurrentStep('details');
  }

  function handleDeviceSubmit(values: z.infer<typeof deviceDetailsSchema>) {
    setIsSubmitting(true);
    
    // Combine the data based on the selected connectivity
    let finalData;
    
    if (selectedConnectivity === 'mqtt') {
      const mqttValues = mqttForm.getValues();
      finalData = {
        ...values,
        connectivity: selectedConnectivity,
        mqttSettings: mqttValues,
      };
    } else {
      const httpValues = httpForm.getValues();
      finalData = {
        ...values,
        connectivity: selectedConnectivity,
        httpSettings: httpValues,
      };
    }
    
    // Here you would typically send the data to your API
    console.log("Form submitted:", finalData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 1000);
  }

  return (
    <>
      {currentStep === 'connectivity' && (
        <Form {...connectivityForm}>
          <form onSubmit={connectivityForm.handleSubmit(handleConnectivitySubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Device Connectivity</h3>
              <FormField
                control={connectivityForm.control}
                name="connectivity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value} 
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`
                            w-full h-32 rounded-md border-2 ${field.value === 'mqtt' ? 'border-primary' : 'border-input'}
                            flex flex-col items-center justify-center gap-2 p-4 hover:border-primary/50 transition-all
                          `}>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              {/* MQTT Icon */}
                              <span className="text-xl font-semibold text-primary">MQTT</span>
                            </div>
                            <FormLabel className="cursor-pointer text-center">
                              MQTT
                              <div className="text-xs text-muted-foreground">Message Queue Telemetry Transport</div>
                            </FormLabel>
                            <RadioGroupItem value="mqtt" className="sr-only" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`
                            w-full h-32 rounded-md border-2 ${field.value === 'http' ? 'border-primary' : 'border-input'}
                            flex flex-col items-center justify-center gap-2 p-4 hover:border-primary/50 transition-all
                          `}>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              {/* HTTP Icon */}
                              <span className="text-xl font-semibold text-primary">HTTP</span>
                            </div>
                            <FormLabel className="cursor-pointer text-center">
                              HTTP
                              <div className="text-xs text-muted-foreground">Hypertext Transfer Protocol</div>
                            </FormLabel>
                            <RadioGroupItem value="http" className="sr-only" />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onSubmit}>
                Cancel
              </Button>
              <Button type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      )}

      {currentStep === 'details' && (
        <Form {...deviceForm}>
          <form onSubmit={deviceForm.handleSubmit(handleDeviceSubmit)} className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className={`px-3 py-1 text-xs rounded-full ${selectedConnectivity === 'mqtt' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {selectedConnectivity === 'mqtt' ? 'MQTT' : 'HTTP'}
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentStep('connectivity')}
                  className="text-xs h-7"
                >
                  Change
                </Button>
              </div>

              <FormField
                control={deviceForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Temperature Sensor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={deviceForm.control}
                name="deviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device ID</FormLabel>
                    <FormControl>
                      <Input placeholder="temp-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={deviceForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sensor">Sensor</SelectItem>
                        <SelectItem value="actuator">Actuator</SelectItem>
                        <SelectItem value="gateway">Gateway</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={deviceForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter device description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Connectivity-specific settings */}
              {selectedConnectivity === 'mqtt' && (
                <div className="space-y-4 border rounded-md p-4 bg-muted/20">
                  <h4 className="font-medium">MQTT Settings</h4>
                  
                  <Form {...mqttForm}>
                    <div className="space-y-4">
                      <FormField
                        control={mqttForm.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>MQTT Topic</FormLabel>
                            <FormControl>
                              <Input placeholder="devices/temperature" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={mqttForm.control}
                        name="qos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quality of Service (QoS)</FormLabel>
                            <FormControl>
                              <ToggleGroup 
                                type="single" 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="justify-start"
                              >
                                <ToggleGroupItem value="0" aria-label="QoS 0">0</ToggleGroupItem>
                                <ToggleGroupItem value="1" aria-label="QoS 1">1</ToggleGroupItem>
                                <ToggleGroupItem value="2" aria-label="QoS 2">2</ToggleGroupItem>
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Form>
                </div>
              )}
              
              {selectedConnectivity === 'http' && (
                <div className="space-y-4 border rounded-md p-4 bg-muted/20">
                  <h4 className="font-medium">HTTP Settings</h4>
                  
                  <Form {...httpForm}>
                    <div className="space-y-4">
                      <FormField
                        control={httpForm.control}
                        name="endpoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endpoint URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://api.example.com/data" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={httpForm.control}
                        name="method"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>HTTP Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select HTTP method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="GET">GET</SelectItem>
                                <SelectItem value="POST">POST</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Form>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setCurrentStep('connectivity')}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Device"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
