
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in",
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a href="/" className="inline-flex items-center mb-5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-iot-primary to-iot-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">zsee</span>
            </div>
            <span className="font-bold text-xl ml-2">zsee IoT</span>
          </a>
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to access your IoT dashboard" 
              : "Join thousands of IoT developers"}
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-iot-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-iot-accent/10 rounded-full blur-xl"></div>
          
          <Card className="border-muted shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
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
                      required
                    />
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Processing..."
                  ) : isLogin ? (
                    <>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Create account <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm">
                {isLogin ? (
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-iot-primary hover:underline font-medium"
                    >
                      Sign up
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
