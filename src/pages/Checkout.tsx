import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Printer, ArrowLeft, Share2, ShoppingBag, CheckCircle2 } from "lucide-react";
import html2canvas from "html2canvas";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedInvoice, setPlacedInvoice] = useState("");
  const [checkoutStep, setCheckoutStep] = useState<"details" | "invoice">("details");

  const [previousDetails, setPreviousDetails] = useState<any>(() => {
    const saved = localStorage.getItem("nsf_last_billing_details");
    return saved ? JSON.parse(saved) : null;
  });

  const [showNewForm, setShowNewForm] = useState<boolean>(() => {
    const saved = localStorage.getItem("nsf_last_billing_details");
    return !saved;
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: previousDetails?.phone || "",
    companyAddress: user?.companyAddress || "",
  });
  
  const [confirmedDetails, setConfirmedDetails] = useState<any>(null);

  const handleUsePrevious = () => {
    setConfirmedDetails(previousDetails);
    setCheckoutStep("invoice");
  };

  const handleEnterNewDetails = () => {
    setFormData({ name: "", email: "", phone: "", companyAddress: "" });
    setShowNewForm(true);
  };

  const handleCancelNewDetails = () => {
    // If they cancel, restore the prepopulation from context + previous details just in case
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: previousDetails?.phone || "",
      companyAddress: user?.companyAddress || "",
    });
    setShowNewForm(false);
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("nsf_last_billing_details", JSON.stringify(formData));
    setPreviousDetails(formData);
    setConfirmedDetails(formData);
    setCheckoutStep("invoice");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // Assuming 18% GST standard rate for example
  };

  const calculateCGST = () => calculateSubtotal() * 0.09;
  const calculateSGST = () => calculateSubtotal() * 0.09;

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePlaceOrder = () => {
    const today = new Date().toISOString().split("T")[0];
    const existing = JSON.parse(localStorage.getItem("nsf_orders") || "[]");
    
    // Group all cart items into a single order
    const newOrder = {
      id: invoiceNumber,
      customerName: confirmedDetails?.name || "Web Customer",
      customerEmail: confirmedDetails?.email || "guest@order.com",
      companyAddress: confirmedDetails?.companyAddress || "Online Order",
      items: cartItems.map((item) => ({
        product: item.name,
        category: item.name.toLowerCase().includes("powder") ? "Detergent Powder" : "Detergent Cake",
        quantity: item.quantity,
        amount: Number(item.price) * item.quantity,
      })),
      subtotal: calculateSubtotal(),
      gstRate: 18,
      gstAmount: calculateTax(),
      totalAmount: calculateTotal(),
      date: today,
      status: "PENDING",
    };

    localStorage.setItem("nsf_orders", JSON.stringify([newOrder, ...existing]));
    setPlacedInvoice(invoiceNumber);
    setOrderPlaced(true);
    clearCart();
  };

  // ── Order success screen ──────────────────────────────────────────────────────
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
          <div className="bg-emerald-100 rounded-full p-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">Order Placed!</h1>
            <p className="text-muted-foreground">Thank you! We've received your order and will process it shortly.</p>
          </div>
          <div className="bg-muted/40 border border-border rounded-xl px-8 py-4 w-full">
            <p className="text-sm text-muted-foreground">Invoice Number</p>
            <p className="text-lg font-mono font-bold text-foreground mt-1">{placedInvoice}</p>
          </div>
          <Link to="/products" className="w-full">
            <Button className="w-full h-12 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-heading">No items to checkout</h2>
        <Link to="/products">
          <Button className="bg-primary hover:bg-primary-hover text-white">
            Return to Store
          </Button>
        </Link>
      </div>
    );
  }

  // Generate a random invoice number
  const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleShare = async () => {
    const el = document.getElementById("invoice-paper");
    if (!el) return;
    try {
      // Create a temporary clone to ensure we print what we see (ignoring print:hidden elements if we wanted, but html2canvas doesn't use media print by default)
      const canvas = await html2canvas(el, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `invoice-${invoiceNumber}.png`, { type: "image/png" });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `Invoice ${invoiceNumber}`,
              text: "Here is your invoice from Naval Soap Factory",
            });
          } catch(err) {
            console.log("Share skipped or failed", err);
          }
        } else {
          // Fallback to download
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `invoice-${invoiceNumber}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  if (checkoutStep === "details") {
    return (
      <div className="min-h-screen bg-background py-10">
        <div className="max-w-xl mx-auto px-4">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
          
          <h1 className="text-3xl font-heading font-bold text-heading mb-6">Billing & Shipping Details</h1>

          {previousDetails && !showNewForm && (
            <div className="bg-card border border-border rounded-xl p-5 mb-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3 text-heading">Use Previous Details</h2>
              <div className="space-y-1.5 mb-5 text-foreground text-sm">
                <p><span className="font-medium text-muted-foreground">Name:</span> {previousDetails.name}</p>
                <p><span className="font-medium text-muted-foreground">Email:</span> {previousDetails.email}</p>
                {previousDetails.phone && <p><span className="font-medium text-muted-foreground">Phone:</span> {previousDetails.phone}</p>}
                <p><span className="font-medium text-muted-foreground">Company Address:</span> {previousDetails.companyAddress}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" onClick={handleUsePrevious} className="flex-1 h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white">
                  Continue with these details
                </Button>
                <Button type="button" onClick={handleEnterNewDetails} variant="outline" className="flex-1 h-12 text-base font-bold text-primary border-primary hover:bg-primary/10">
                  Enter New Details
                </Button>
              </div>
            </div>
          )}

          {showNewForm && (
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-heading">
                  Enter Details
                </h2>
                {previousDetails && (
                  <button
                    type="button"
                    onClick={handleCancelNewDetails}
                    className="text-sm font-medium text-primary hover:text-primary-hover underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            <form onSubmit={handleDetailsSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="E.g. John Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="E.g. john@company.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="E.g. +91 9876543210" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Company Address</Label>
                <Input id="address" required value={formData.companyAddress} onChange={(e) => setFormData({...formData, companyAddress: e.target.value})} placeholder="Full shipping address" />
              </div>
              <Button type="submit" className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 text-white mt-4">
                Continue to Invoice
              </Button>
            </form>
          </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 print:py-0 print:bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Screen Only Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => setCheckoutStep("details")}
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Details
          </button>

          <div className="flex gap-3">
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Bill
            </Button>
          </div>
        </div>

        {/* Invoice Paper */}
        <div id="invoice-paper" className="bg-card border border-border sm:rounded-lg sm:p-10 p-6 shadow-sm print:shadow-none print:border-none print:p-0">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-border">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary mb-1">Naval Soap Factory</h1>
              <p className="text-muted-foreground text-sm">Silver Detergent Private Limited</p>
              <p className="text-muted-foreground text-sm mt-2">6/D/1, Anand Industrial Estate, Borsad Road, ANAND - 388 001. (Guj.)</p>
              <p className="text-muted-foreground text-sm">Phone: +91 98258 21075</p>
              <p className="text-muted-foreground text-sm">Phone: +91 98258 05478</p>
            </div>
            <div className="mt-6 md:mt-0 text-left md:text-right">
              <h2 className="text-2xl font-bold text-heading mb-2">INVOICE</h2>
              <p className="text-muted-foreground font-medium text-sm">Bill # <span className="text-foreground">{invoiceNumber}</span></p>
              <p className="text-muted-foreground font-medium text-sm">Date: <span className="text-foreground">{dateStr}</span></p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-border text-heading text-sm uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold text-center">Qty</th>
                  <th className="pb-3 font-semibold text-right">Unit Price</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm text-foreground">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-heading">{item.name}</p>
                    </td>
                    <td className="py-4 px-2 text-center">{item.quantity}</td>
                    <td className="py-4 pl-4 text-right">₹{item.price}</td>
                    <td className="py-4 pl-4 text-right font-medium text-heading">
                      ₹{Number(item.price) * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-6">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-medium">₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>CGST (9%)</span>
                <span className="text-foreground font-medium">₹{calculateCGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SGST (9%)</span>
                <span className="text-foreground font-medium">₹{calculateSGST().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-heading font-bold text-xl pt-3 border-t border-border mt-3">
                <span>Total</span>
                <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Place Order */}
          <div className="mt-8 flex justify-end print:hidden">
            <Button
              onClick={handlePlaceOrder}
              size="lg"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-base px-10 h-12 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              Place Order
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p className="font-medium text-heading mb-1">Thank you for your business!</p>
            <p>If you have any questions about this invoice, please contact support@navalsoap.com</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
