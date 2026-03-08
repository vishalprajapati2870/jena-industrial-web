import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, ArrowRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [testEmailUrl, setTestEmailUrl] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectParams = searchParams.get("redirect") || "/";

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (name.trim().length < 2) {
      toast.error("Please enter your full name");
      return;
    }
    if (companyAddress.trim().length < 5) {
      toast.error("Please enter your company address");
      return;
    }

    setIsSending(true);
    setTestEmailUrl("");
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      if (data.success) {
        setStep("OTP");
        toast.success("OTP sent to your email!");
        if (data.url) {
          setTestEmailUrl(data.url);
        }
      } else {
        toast.error("Failed to send OTP. Is the backend running?");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server. Make sure the backend is running on port 5000.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      
      if (data.success) {
        login(email, name, companyAddress, phone);
        toast.success("Successfully logged in!");
        navigate(redirectParams);
      } else {
        toast.error(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="bg-primary/5 p-6 text-center border-b border-border">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-heading">Sign In with Email</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Secure and passwordless login to your account using Email OTP.
          </p>
        </div>

        <div className="p-6">
          {step === "EMAIL" ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Company Address */}
              <div className="space-y-1.5">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  type="text"
                  placeholder="Enter your company address"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white"
                disabled={isSending || !email.includes("@") || !name.trim() || !companyAddress.trim()}
              >
                {isSending ? (
                  "Sending OTP..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Get OTP via Email
                  </>
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-muted p-4 rounded-lg flex items-center justify-between mb-4">
                <div className="truncate pr-4 w-full">
                  <p className="text-sm text-muted-foreground">Sent to</p>
                  <p className="font-medium truncate">{email}</p>
                </div>
                <Button
                  variant="ghost"
                  type="button"
                  size="sm"
                  onClick={() => setStep("EMAIL")}
                  className="text-primary hover:text-primary-hover flex-shrink-0"
                >
                  Change
                </Button>
              </div>

              {testEmailUrl && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800 mb-2 font-medium">Test Mode Active</p>
                  <p className="text-xs text-blue-600 mb-3">
                    A test email was sent using Ethereal. Click below to view the actual email and get your OTP.
                  </p>
                  <a 
                    href={testEmailUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-sm font-medium bg-white border border-blue-300 text-blue-700 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Test Inbox
                  </a>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="otp">Enter Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="text-center text-lg tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isVerifying || otp.length < 4}
              >
                {isVerifying ? (
                  "Verifying..."
                ) : (
                  <>
                    Verify & Login
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Didn't receive code?{" "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-primary hover:underline"
                  disabled={isSending}
                >
                  Resend OTP
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
