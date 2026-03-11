import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, ShoppingBag, Minus, ShieldCheck, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDecrement = (item: { id: string; name: string; quantity: number }) => {
    const newQty = item.quantity - 1;
    if (newQty < 50) {
      toast({
        title: "Minimum Quantity Required",
        description: `Minimum order quantity for ${item.name} is 50 items.`,
        variant: "destructive",
      });
      return;
    }
    updateQuantity(item.id, newQty);
  };

  const handleIncrement = (item: { id: string; quantity: number }) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const totalAmount = subtotal + cgst + sgst;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-heading font-medium">Shopping Cart</span>
        </nav>

        <h1 className="text-4xl font-heading font-bold text-heading mb-8">
          Your Shopping Bag
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-16 text-center shadow-sm max-w-lg mx-auto">
            <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-5" />
            <h2 className="text-2xl font-semibold text-heading mb-3">
              Your bag is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products yet.
            </p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary-hover text-white px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT: Cart Items */}
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-2xl p-5 flex gap-5 items-start shadow-sm"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-heading font-semibold text-heading text-base sm:text-lg leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-heading flex-shrink-0">
                          ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        ₹{Number(item.price).toLocaleString("en-IN")} / {item.priceUnit}
                      </p>

                      {/* Quantity Controls + Remove */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleDecrement(item)}
                            className="px-3 py-2 text-muted-foreground hover:text-heading hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium text-sm text-heading min-w-[3rem] text-center border-x border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(item)}
                            className="px-3 py-2 text-muted-foreground hover:text-heading hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Items */}
              <div className="mt-4">
                <Link to="/products">
                  <button className="w-full border-2 border-dashed border-primary/40 text-primary hover:text-primary hover:bg-primary/5 hover:border-primary font-semibold py-5 rounded-2xl text-base flex items-center justify-center gap-2 transition-all duration-300">
                    <Plus className="w-5 h-5" />
                    Add more items to your bag
                  </button>
                </Link>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-heading font-bold text-heading mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-heading">
                      ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">CGST (9%)</span>
                    <span className="font-medium text-heading">
                      ₹{cgst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">SGST (9%)</span>
                    <span className="font-medium text-heading">
                      ₹{sgst.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Estimated Shipping</span>
                    <span className="font-medium text-heading">Free</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="font-bold text-heading text-lg">Total</span>
                    <span className="font-bold text-primary text-xl">
                      ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (user) {
                      navigate("/checkout");
                    } else {
                      navigate("/login?redirect=/checkout");
                    }
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-6 h-auto text-base font-semibold rounded-xl tracking-wide gap-2"
                >
                  Proceed to Checkout →
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  By placing your order, you agree to our{" "}
                  <Link to="#" className="underline hover:text-primary">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="#" className="underline hover:text-primary">Privacy Policy</Link>.
                </p>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      Secure SSL checkout with 256-bit encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
