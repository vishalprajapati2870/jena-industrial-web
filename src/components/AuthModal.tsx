import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isSignUp ? "Account Created!" : "Signed In!",
      description: isSignUp 
        ? "Welcome to Jena Marketing. Your account has been created." 
        : "Welcome back! You have successfully signed in.",
    });
    setFormData({ name: "", email: "", phone: "", password: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Toggle Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              isSignUp
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              !isSignUp
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignUp && (
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
          />

          {isSignUp && (
            <Input
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
            />
          )}

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By creating an account, you agree to our Terms & Service
        </p>
      </div>
    </div>
  );
};
