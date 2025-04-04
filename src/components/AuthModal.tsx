
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, setMode }) => {
  const { toast } = useToast();
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
      if (mode === "login") {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in",
        });
      } else {
        toast({
          title: "Account created!",
          description: "Check your email to verify your account",
        });
      }
    }, 1000);
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {mode === "login"
            ? "Enter your details to access your dashboard"
            : "Start your IoT journey today"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
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
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? "Loading..."
            : mode === "login"
              ? "Log in"
              : "Sign up"}
        </Button>
      </form>

      <div className="mt-5 text-center text-sm">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-iot-primary hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-iot-primary hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
