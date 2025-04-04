
import { 
  Building2, 
  Factory, 
  Home, 
  Leaf, 
  Truck, 
  ShoppingBag 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const industries = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    icon: Factory,
    title: "Smart Manufacturing Solutions",
    description: "Improve operational efficiency, reduce downtime, and optimize production with our IoT platform. Monitor equipment performance and predict maintenance needs in real-time.",
    features: [
      "Predictive maintenance for equipment",
      "Production line monitoring",
      "Quality control automation",
      "Asset tracking and management",
    ],
    image: "bg-gradient-to-r from-blue-500 to-blue-700",
  },
  {
    id: "smart-home",
    label: "Smart Home",
    icon: Home,
    title: "Connected Home Experiences",
    description: "Create intelligent home environments with our IoT platform. Build applications that connect and control smart devices, enhancing comfort, security, and energy efficiency.",
    features: [
      "Centralized device control",
      "Energy usage optimization",
      "Security and monitoring",
      "Voice-controlled automation",
    ],
    image: "bg-gradient-to-r from-purple-500 to-purple-700",
  },
  {
    id: "agriculture",
    label: "Agriculture",
    icon: Leaf,
    title: "Precision Agriculture",
    description: "Revolutionize farming with data-driven insights. Monitor soil conditions, weather, crop health, and automate irrigation systems to increase yields and sustainability.",
    features: [
      "Soil moisture monitoring",
      "Climate condition tracking",
      "Automated irrigation systems",
      "Crop health analysis",
    ],
    image: "bg-gradient-to-r from-green-500 to-green-700",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    title: "Connected Supply Chain",
    description: "Optimize your supply chain with real-time tracking and monitoring. Ensure product integrity and improve delivery efficiency with our IoT solutions.",
    features: [
      "Fleet management and tracking",
      "Cold chain monitoring",
      "Warehouse optimization",
      "Delivery route optimization",
    ],
    image: "bg-gradient-to-r from-orange-500 to-orange-700",
  },
  {
    id: "retail",
    label: "Retail",
    icon: ShoppingBag,
    title: "Smart Retail Solutions",
    description: "Transform the retail experience with IoT-powered inventory management, customer analytics, and interactive shopping experiences.",
    features: [
      "Inventory management",
      "Customer behavior analytics",
      "Smart shelves and displays",
      "Personalized shopping experiences",
    ],
    image: "bg-gradient-to-r from-red-500 to-red-700",
  },
  {
    id: "commercial",
    label: "Commercial",
    icon: Building2,
    title: "Smart Buildings & Facilities",
    description: "Create intelligent commercial spaces with our building management solutions. Monitor and optimize energy usage, security, and occupancy to reduce costs and improve comfort.",
    features: [
      "Energy management",
      "Occupancy tracking",
      "HVAC optimization",
      "Security system integration",
    ],
    image: "bg-gradient-to-r from-cyan-500 to-cyan-700",
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            IoT Solutions For Every Industry
          </h2>
          <p className="text-lg text-gray-600">
            Our platform powers IoT applications across diverse sectors, delivering tailored 
            solutions for any business need.
          </p>
        </div>

        <Tabs defaultValue="manufacturing" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto gap-2">
              {industries.map((industry) => (
                <TabsTrigger
                  key={industry.id}
                  value={industry.id}
                  className="flex-col py-3 px-4 data-[state=active]:bg-iot-primary data-[state=active]:text-white"
                >
                  <industry.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{industry.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {industries.map((industry) => (
            <TabsContent key={industry.id} value={industry.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                  <p className="mb-6 text-gray-600">{industry.description}</p>
                  
                  <ul className="space-y-3">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="bg-iot-primary/10 rounded-full p-1 mr-3">
                          <svg className="w-4 h-4 text-iot-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`aspect-video ${industry.image} flex items-center justify-center p-12 text-white`}>
                      <industry.icon className="h-32 w-32 opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default UseCases;
