
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, ArrowRight, Wifi, Shield, Lock, Server, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Animation for connected devices visual
  const [activeNodes, setActiveNodes] = useState([false, false, false, false, false, false]);

  useEffect(() => {
    // Simulate IoT device connections with random timing
    const intervals = activeNodes.map((_, index) => {
      return setInterval(() => {
        setActiveNodes(prev => {
          const newState = [...prev];
          newState[index] = !newState[index];
          return newState;
        });
      }, 2000 + Math.random() * 4000);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        toast({
          title: "Welcome back!",
          description: "Connected to your IoT dashboard",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Account created!",
          description: "Check your email to verify your account",
        });
        setIsLogin(true);
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-background overflow-hidden">
      {/* Background IoT network animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {/* Connection nodes */}
          {activeNodes.map((active, i) => (
            <div 
              key={i}
              className={`absolute w-2 h-2 rounded-full transition-all duration-1000 ${
                active ? "bg-iot-primary" : "bg-gray-400/20"
              }`}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                boxShadow: active ? `0 0 15px 3px ${theme === "dark" ? "rgba(0, 112, 243, 0.4)" : "rgba(0, 112, 243, 0.2)"}` : "none"
              }}
            />
          ))}
          
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <g className="transform translate-x-1/2 translate-y-1/2">
              {[...Array(12)].map((_, i) => (
                <line 
                  key={i}
                  x1={Math.random() * 100 - 50} 
                  y1={Math.random() * 100 - 50}
                  x2={Math.random() * 100 - 50} 
                  y2={Math.random() * 100 - 50}
                  stroke={theme === "dark" ? "#0070f3" : "#0070f3"}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  className="animate-pulse-slow"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="mb-8 text-center">
          <a href="/" className="inline-flex items-center mb-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-iot-primary to-iot-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">zsee</span>
            </div>
            <span className="font-bold text-xl ml-2">zsee IoT</span>
          </a>
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Control Center" : "Join the Network"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Access your connected devices & data" 
              : "Create your IoT command center"}
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-iot-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-iot-accent/10 rounded-full blur-xl"></div>
          
          <Card className="border-muted shadow-xl backdrop-blur-sm bg-background/80">
            {/* Device icons decorative element */}
            <div className="absolute -top-6 right-6 flex space-x-3">
              <motion.div 
                className="flex items-center justify-center w-8 h-8 rounded-full bg-iot-primary/10 text-iot-primary"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <Wifi size={14} />
              </motion.div>
              <motion.div 
                className="flex items-center justify-center w-8 h-8 rounded-full bg-iot-accent/10 text-iot-accent"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
              >
                <Database size={14} />
              </motion.div>
              <motion.div 
                className="flex items-center justify-center w-8 h-8 rounded-full bg-iot-secondary/10 text-iot-secondary"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
              >
                <Server size={14} />
              </motion.div>
            </div>

            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="pl-10"
                        required={!isLogin}
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                        <Shield size={16} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-10"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Shield size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                      className="pl-10"
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock size={16} />
                    </div>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {isLogin && (
                    <div className="text-right">
                      <a href="#" className="text-sm text-iot-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full relative overflow-hidden transition-all hover:shadow-lg hover:shadow-iot-primary/20"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      "Connecting..."
                    ) : isLogin ? (
                      <>Access Platform <ArrowRight className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Join Network <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-iot-primary via-iot-secondary to-iot-primary bg-[length:200%_100%] animate-pulse-slow"></span>
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                {isLogin ? (
                  <p className="text-muted-foreground">
                    New to the platform?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-iot-primary hover:underline font-medium"
                    >
                      Create account
                    </button>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-iot-primary hover:underline font-medium"
                    >
                      Log in
                    </button>
                  </p>
                )}
              </div>

              {/* Theme toggle */}
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={toggleTheme}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center"
                >
                  <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          By continuing, you agree to zsee IoT's{" "}
          <a href="#" className="underline hover:text-iot-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-iot-primary">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
