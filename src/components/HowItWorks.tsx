
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Devices",
    description: "Easily connect your IoT devices through our secure gateways using MQTT, HTTP, or other protocols.",
  },
  {
    number: "02",
    title: "Configure Data Processing",
    description: "Set up data processing rules to filter, transform, and route your device data to where it needs to go.",
  },
  {
    number: "03",
    title: "Visualize & Monitor",
    description: "Build custom dashboards to visualize your device data and monitor performance in real-time.",
  },
  {
    number: "04",
    title: "Automate & Scale",
    description: "Create automation workflows and scale your IoT solution as your business grows.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How IoT-Sphere Works
          </h2>
          <p className="text-lg text-gray-600">
            Get your IoT application up and running in minutes with our simple four-step process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-6">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-iot-primary text-white font-bold">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <Button className="group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <div className="w-full h-full bg-gradient-to-br from-iot-primary/90 to-iot-accent/90 p-8 flex flex-col justify-center">
                <div className="mb-8 space-y-3">
                  <div className="w-full h-8 bg-white/20 rounded"></div>
                  <div className="w-2/3 h-8 bg-white/20 rounded"></div>
                </div>
                
                <div className="space-y-5">
                  <div className="h-16 bg-white/10 rounded-lg flex p-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-white/20 rounded"></div>
                      <div className="h-4 w-full bg-white/20 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="h-16 bg-white/10 rounded-lg flex p-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-white/20 rounded"></div>
                      <div className="h-4 w-5/6 bg-white/20 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="h-16 bg-white/10 rounded-lg flex p-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 mr-3"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-20 bg-white/20 rounded"></div>
                      <div className="h-4 w-full bg-white/20 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
