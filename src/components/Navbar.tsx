import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
    { name: "Email Demo", href: "/email-demo" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Admin", href: "/admin" },
    { name: "Theme Docs", href: "/theme-docs" },
    { name: "Color Guide", href: "/color-guide" },
    { name: "Chakra Theme", href: "/chakra-theme" },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 py-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-iot-primary to-iot-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">zsee</span>
          </div>
          <span className="font-bold text-xl">zsee IoT</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.href.startsWith("/") ? (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-gray-700 hover:text-iot-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ) : (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-gray-700 hover:text-iot-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            )
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button 
              variant="ghost" 
              className="font-medium"
            >
              Log in
            </Button>
          </Link>

          <Link to="/login">
            <Button 
              className="font-medium"
            >
              Sign up
            </Button>
          </Link>
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
              item.href.startsWith("/") ? (
                <Link 
                  key={item.name} 
                  to={item.href} 
                  className="text-gray-800 text-lg py-2 font-medium" 
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ) : (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-800 text-lg py-2 font-medium" 
                  onClick={toggleMenu}
                >
                  {item.name}
                </a>
              )
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link to="/login">
                <Button 
                  variant="outline" 
                  className="w-full mb-3"
                  onClick={toggleMenu}
                >
                  Log in
                </Button>
              </Link>

              <Link to="/login">
                <Button 
                  className="w-full"
                  onClick={toggleMenu}
                >
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
