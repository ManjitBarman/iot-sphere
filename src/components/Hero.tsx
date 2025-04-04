
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, BarChart2, BoxSelect, Cpu } from "lucide-react";
import AuthModal from "./AuthModal";
import { useState } from "react";

const Hero = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  
  return (
    <div className="pt-28 pb-16 md:pt-36 md:pb-24 hero-pattern relative overflow-hidden">
      {/* Decorative elements */}
      <div className="blur-circle bg-iot-primary/30 w-[500px] h-[500px] -top-[250px] -right-[250px]" />
      <div className="blur-circle bg-iot-accent/20 w-[600px] h-[600px] -bottom-[400px] -left-[300px]" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Turn Your IoT Data Into 
              <span className="gradient-text"> Powerful Insights</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Build, manage, and scale IoT applications with zsee IoT platform. 
              Connect devices, visualize data, and automate workflows—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8 py-6 text-base font-medium">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal mode={authMode} setMode={setAuthMode} />
                </DialogContent>
              </Dialog>
              
              <Button size="lg" variant="outline" className="px-8 py-6 text-base font-medium">
                Schedule Demo
              </Button>
            </div>

            <div className="mt-8 flex items-center text-sm text-gray-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M8 0L10.2 5.8L16 6.2L11.8 10.2L12.9 16L8 13.1L3.1 16L4.2 10.2L0 6.2L5.8 5.8L8 0Z" fill="#0070f3"/>
              </svg>
              <span>Trusted by 1000+ businesses worldwide</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              {/* Dashboard preview */}
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-iot-primary/10 p-4 rounded-lg flex items-start">
                      <Cpu className="text-iot-primary mr-3" />
                      <div>
                        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 w-16 bg-iot-primary rounded font-bold text-white flex items-center justify-center">86%</div>
                      </div>
                    </div>
                    <div className="bg-iot-accent/10 p-4 rounded-lg flex items-start">
                      <BarChart2 className="text-iot-accent mr-3" />
                      <div>
                        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 w-16 bg-iot-accent rounded font-bold text-white flex items-center justify-center">24.6</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-40 bg-gray-100 rounded-lg mb-5 flex items-center justify-center">
                    <BoxSelect className="h-10 w-10 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -z-10 top-8 left-8 right-8 bottom-8 border-2 border-dashed border-iot-primary/50 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
