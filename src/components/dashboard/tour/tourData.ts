
export interface TourStep {
  title: string;
  content: string;
  image: string;
  target: string | null;
}

// Tour steps with their content and navigation targets
export const tourSteps: TourStep[] = [
  {
    title: "Welcome to zsee IoT Platform",
    content: "Let's take a quick tour to help you get started with our IoT platform. We'll guide you through the essential setup process, from device registration to real-time monitoring.",
    image: "onboarding-welcome.svg",
    target: null
  },
  {
    title: "Step 1: Navigate to Devices",
    content: "First, go to the Devices section where you'll manage your IoT hardware. This is where you'll start the device registration process.",
    image: "onboarding-devices.svg",
    target: "/devices"
  },
  {
    title: "Step 2: Add a New Device",
    content: "Click the 'Add Device' button to register your IoT hardware. This will open a form for entering your device details.",
    image: "onboarding-add-device.svg",
    target: "/devices"
  },
  {
    title: "Step 3: Select Connectivity Type",
    content: "Choose your device's connectivity method (MQTT or HTTP) and enter the required device details in the popup form.",
    image: "onboarding-connectivity.svg",
    target: null
  },
  {
    title: "Step 4: Configure Topics",
    content: "After creating your device, you'll need to configure MQTT topics within the device settings. These topics define the data channels between your device and the platform.",
    image: "onboarding-topics.svg",
    target: null
  },
  {
    title: "Step 5: Create Dashboard",
    content: "Next, create a dashboard to visualize and monitor your device data. If one doesn't exist already, the system will help you create one.",
    image: "onboarding-dashboard.svg",
    target: "/dashboards"
  },
  {
    title: "Step 6: Setup Simulation",
    content: "If you have hardware JSON data available, paste it into the simulation section to test your setup before connecting actual hardware.",
    image: "onboarding-simulation.svg",
    target: null
  },
  {
    title: "Step 7: Add Widgets",
    content: "In dashboard edit mode, click 'Add Widget' to visualize different aspects of your device data. You can choose from various widget types and customize their appearance.",
    image: "onboarding-widgets.svg",
    target: null
  },
  {
    title: "All Set!",
    content: "Congratulations! Your IoT monitoring system is now ready. You can monitor your devices in real-time through your customized dashboard.",
    image: "onboarding-complete.svg",
    target: null
  }
];
