import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Printer, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // Assuming 18% GST standard rate for example
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <div className="min-h-screen bg-background py-10 print:py-0 print:bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Screen Only Actions */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Bill
          </Button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-card border border-border sm:rounded-lg sm:p-10 p-6 shadow-sm print:shadow-none print:border-none print:p-0">

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
                <span>Estimated Tax (18%)</span>
                <span className="text-foreground font-medium">₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-heading font-bold text-xl pt-3 border-t border-border mt-3">
                <span>Total</span>
                <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
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
