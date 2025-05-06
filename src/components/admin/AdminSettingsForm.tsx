
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";

export function AdminSettingsForm() {
  const form = useForm({
    defaultValues: {
      siteName: "zsee IoT Platform",
      supportEmail: "support@zseeiot.com",
      maintenanceMode: false,
      dataRetentionDays: "90",
      timezone: "UTC",
      alertNotifications: true,
      systemUpdates: "automatic",
    }
  });

  function onSubmit(data: any) {
    console.log("Settings form submitted with data:", data);
    // Mock success message would be added here
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList className="grid w-full md:w-fit grid-cols-3 md:grid-cols-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
      </TabsList>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium">General Settings</h3>
              
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      The name displayed throughout the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormDescription>
                      Email address for support inquiries.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Timezone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Default timezone for displaying times across the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              
              <FormField
                control={form.control}
                name="alertNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable Alert Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications for system alerts and events.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="rounded-md border p-4">
                <h4 className="mb-2 font-medium">Notification Channels</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="email-notif" />
                    <label htmlFor="email-notif" className="text-sm">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="sms-notif" />
                    <label htmlFor="sms-notif" className="text-sm">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="slack-notif" />
                    <label htmlFor="slack-notif" className="text-sm">
                      Slack Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="webhook-notif" />
                    <label htmlFor="webhook-notif" className="text-sm">
                      Webhook Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium">System Preferences</h3>
              
              <FormField
                control={form.control}
                name="dataRetentionDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Retention Period (days)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="1" />
                    </FormControl>
                    <FormDescription>
                      Number of days to retain device data in the system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="systemUpdates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Updates</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select update policy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic (Recommended)</SelectItem>
                        <SelectItem value="notify">Notify Only</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Control how system updates are handled.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium">Maintenance Settings</h3>
              
              <FormField
                control={form.control}
                name="maintenanceMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Maintenance Mode</FormLabel>
                      <FormDescription>
                        When enabled, only administrators can access the platform. All other users will see a maintenance page.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="grid gap-2">
                <h4 className="font-medium">System Maintenance</h4>
                <div className="grid gap-2">
                  <Button variant="outline">Run Database Optimization</Button>
                  <Button variant="outline">Clear System Cache</Button>
                  <Button variant="outline">Generate System Report</Button>
                  <Button variant="outline" className="text-amber-600 hover:bg-amber-50">Restart Services</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
}
