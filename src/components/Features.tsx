
import {
  Activity,
  Cpu,
  Database,
  Lock,
  BarChart3,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Real-time Device Monitoring",
    description: "Track your IoT devices and monitor their performance in real-time with low latency connections.",
    icon: Activity,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Powerful Data Analytics",
    description: "Analyze data trends and gain insights with our powerful analytics and visualization tools.",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    title: "Smart Device Management",
    description: "Efficiently manage your devices with over-the-air updates and remote configuration options.",
    icon: Cpu,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Secure Data Storage",
    description: "Store device data securely in our cloud infrastructure with encryption and backup options.",
    icon: Database,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Enterprise-grade Security",
    description: "Protect your IoT ecosystem with end-to-end encryption, access controls, and security monitoring.",
    icon: Lock,
    color: "bg-red-100 text-red-700",
  },
  {
    title: "Automation & Workflows",
    description: "Create custom automation workflows to respond to device events and trigger actions.",
    icon: Zap,
    color: "bg-amber-100 text-amber-700",
  },
];

const Features = () => {
  return (
    <section id="features" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for IoT Success
          </h2>
          <p className="text-lg text-gray-600">
            Our comprehensive platform provides all the tools and features needed to build, deploy, 
            and manage your IoT solutions at any scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
