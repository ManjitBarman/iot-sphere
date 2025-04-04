
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 py-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-iot-primary to-iot-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">zsee</span>
          </div>
          <span className="font-bold text-xl">zsee IoT</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-gray-700 hover:text-iot-primary transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                onClick={() => setAuthMode("login")}
                className="font-medium"
              >
                Log in
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <AuthModal mode={authMode} setMode={setAuthMode} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={() => setAuthMode("signup")}
                className="font-medium"
              >
                Sign up
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <AuthModal mode={authMode} setMode={setAuthMode} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Navigation */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-5">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-gray-800 text-lg py-2 font-medium" 
                onClick={toggleMenu}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full mb-3" 
                    onClick={() => {
                      setAuthMode("login");
                      toggleMenu();
                    }}
                  >
                    Log in
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal mode={authMode} setMode={setAuthMode} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setAuthMode("signup");
                      toggleMenu();
                    }}
                  >
                    Sign up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <AuthModal mode={authMode} setMode={setAuthMode} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
