import { useState } from "react";
import { X, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, onLoginSuccess }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  // Temporary test credentials
  const TEST_USERNAME = "admin";
  const TEST_PASSWORD = "admin123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      if (isSignUp) {
        // For signup, just show success and switch to login
        toast({
          title: "Account Created!",
          description: "Your account has been created. Please sign in with the test credentials.",
        });
        setIsSignUp(false);
      } else {
        // Sign In - Check against test credentials
        if (formData.name === TEST_USERNAME && formData.password === TEST_PASSWORD) {
          toast({
            title: "Signed In!",
            description: "Welcome back! You have successfully signed in.",
          });
          onLoginSuccess();
          onClose();
        } else {
          throw new Error("Invalid credentials. Use Username: admin, Password: admin123");
        }
      }
      setFormData({ name: "", email: "", phone: "", password: "" });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 pt-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-primary transition-all hover:bg-gray-100 rounded-full p-2 z-10"
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
          {/* We need Username for this specific backend implementation */}
          {(isSignUp || !isSignUp) && (
             <Input
               type="text"
               placeholder="Username"
               value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
               required
             />
          )}
          
          {isSignUp && (
             <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
            required
          />
          )}

          {isSignUp && (
            <Input
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
            />
          )}

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all"
          >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isSignUp ? "Create Account" : "Sign In")}
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
