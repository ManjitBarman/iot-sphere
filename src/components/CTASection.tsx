
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";

const CTASection = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  
  return (
    <section className="bg-gradient-to-r from-iot-primary to-iot-accent text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your IoT Strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already leveraging IoT-Sphere to build next-generation IoT applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="px-8 py-6 text-base">
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <AuthModal mode={authMode} setMode={setAuthMode} />
              </DialogContent>
            </Dialog>

            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10 text-white px-8 py-6 text-base">
              Watch Demo
            </Button>
          </div>
          
          <p className="mt-6 text-sm opacity-80">
            No credit card required for free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
