import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle authentication logic here
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Neon Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-r from-neon-magenta via-neon-pink via-neon-blue to-neon-green opacity-40 blur-3xl"></div>
      </div>

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-[520px] bg-black/45 backdrop-blur-[22px] rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/10 p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Toggle Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-2xl">
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              isSignUp
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "text-white/70 border border-white/15"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-3 rounded-xl font-medium transition-all ${
              !isSignUp
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "text-white/70 border border-white/15"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-6">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-14 bg-white/8 border-white/14 rounded-xl text-white placeholder:text-white/40 focus:border-white/40"
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-14 bg-white/8 border-white/14 rounded-xl text-white placeholder:text-white/40 focus:border-white/40"
          />

          {isSignUp && (
            <Input
              type="tel"
              placeholder="(XXX) XXX-XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 bg-white/8 border-white/14 rounded-xl text-white placeholder:text-white/40 focus:border-white/40"
            />
          )}

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="h-14 bg-white/8 border-white/14 rounded-xl text-white placeholder:text-white/40 focus:border-white/40"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-white to-gray-200 text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-white/40 uppercase tracking-wider">
            OR SIGN IN WITH
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-12 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className="h-12 bg-white/10 border border-white/15 rounded-xl text-white text-sm font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Apple
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/40 text-center mt-6">
          By creating an account, you agree to our Terms & Service
        </p>
      </div>
    </div>
  );
};
